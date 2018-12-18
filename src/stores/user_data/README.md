When changing the `PersistedUserData` data structure, the new version of the app will be
unable to load data as saved by any earlier version of the app. To solve this problem,
the app needs to be able to migrate the saved data to the new data structure.

Whenever you're about to change the `PersistedUserData` data structure, do this:

1. Copy the existing form of `PersistedUserData` to the types file under legacy data
`/pathways-frontend/src/stores/user_data/legacy_data/types.ts`. Change the name of the
data structure so that it reflects the version, but *do* *not* change its version string.

2. Looking at the existing conversion functions in that same file, find the one that
returns data of type `PersistedUserData` (there should be exactly one). Change the return
type of that function to the name you selected in step 1. Since these two data types are
identical, this should compile.

2. Make whatever changes you need to the `PersistedUserData` data structure.

3. Change the version id of the `PersistedUserData` data structure to reflect the next version
of the app. The format of the version string is not important for migration to work, it just
needs to be unique.

4. Implement a new conversion function. This should convert an instance of the type you
created in step 1 to an instance of the current `PersistedUserData` data structure. Write
unit tests for it.

5. Call the new conversion function from migrateUserData() in
/pathways-frontend/src/stores/user_data/legacy_data/migrate_user_data.ts, using the
version string set in step 3. Write unit test for this.
