# WIP: ngrx-entity-store

## setup

```typescript
// define schema
const user = schema.Entity('users');
const article = schema.Entity('articles', {
  author: users,
});

const schemas = {user, artcie};

// import `NgrxEntityStore`
@NgModule({
  imports: [NgrxEntityStore({schemas})],
})
export class AppModule {}
```

## usage

### select entity by id

```
// article/reducer.ts
const selectArticleIds = createSelector(
  featureStateSelector,
  s => s.ids,
);

// article/facade.ts
@Injectable({providedIn: 'root'})
export class ArticleFacade {
  articles$ = this.store
    .select(selectArticleIds)
    .pipe(
      switchMap(ids => this.entityFacade.getByIds(ids))
    );

  constructor(private entityFacade: EntityFacade) {}
}
```

### add entity

```typescript
// actions.ts
export const fetchArticlesSuccess = withAddEntities(
  'articles',
  ({ articles }) => articles,
  createAction(
    '[Article] Fetch Articles Success',
    props<{ articles: Article[] }>()
  )
);

// effects.ts
export class ArticleEffects {
  constructor(private articleApi: ArticleApi, private actions$: Actions) {}
  
  createEffect(() =>
    this.actions$.pipe(
      ofType(fetchArticles),
      switchMap(() =>
        this.articleApi.fetch()
          .pipe(
            map(articles => fetchArticlesSuccess({ articles })),
            catchError(() => of(fetchArticlesFailure())),
          ),
      ),
    );
  );
}
```
