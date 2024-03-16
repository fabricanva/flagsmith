import { Res } from 'common/types/responses'
import { Req } from 'common/types/requests'
import { service } from 'common/service'

export const groupService = service
  .enhanceEndpoints({
    addTagTypes: ['Group', 'UserGroupPermission', 'GroupSummary'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createGroupAdmin: builder.mutation<
        Res['groupAdmin'],
        Req['createGroupAdmin']
      >({
        invalidatesTags: [{ id: 'LIST', type: 'Group' }],
        query: (query: Req['createGroupAdmin']) => ({
          body: {},
          method: 'POST',
          url: `organisations/${query.orgId}/groups/${query.group}/users/${query.user}/make-admin`,
        }),
      }),
      deleteGroup: builder.mutation<Res['groups'], Req['deleteGroup']>({
        invalidatesTags: [
          { id: 'LIST', type: 'Group' },
          { type: 'UserGroupPermission' },
          { type: 'GroupSummary' },
        ],
        query: (query: Req['deleteGroup']) => ({
          body: query,
          method: 'DELETE',
          url: `organisations/${query.orgId}/groups/${query.id}/`,
        }),
      }),
      deleteGroupAdmin: builder.mutation<
        Res['groupAdmin'],
        Req['deleteGroupAdmin']
      >({
        invalidatesTags: [{ id: 'LIST', type: 'Group' }],
        query: (query: Req['deleteGroupAdmin']) => ({
          body: {},
          method: 'POST',
          url: `organisations/${query.orgId}/groups/${query.group}/users/${query.user}/remove-admin`,
        }),
      }),
      getGroup: builder.query<Res['group'], Req['getGroup']>({
        providesTags: (res) => [{ id: res?.id, type: 'Group' }],
        query: (query: Req['getGroup']) => ({
          url: `organisations/${query.orgId}/groups/${query.id}/`,
        }),
      }),
      getGroups: builder.query<Res['groups'], Req['getGroups']>({
        providesTags: [{ id: 'LIST', type: 'Group' }],
        query: (query) => ({
          url: `organisations/${query.orgId}/groups/?page=${query.page}`,
        }),
      }),
      // END OF ENDPOINTS
    }),
  })

export async function getGroups(
  store: any,
  data: Req['getGroups'],
  options?: Parameters<typeof groupService.endpoints.getGroups.initiate>[1],
) {
  return store.dispatch(
    groupService.endpoints.getGroups.initiate(data, options),
  )
}

export async function createGroupAdmin(
  store: any,
  data: Req['createGroupAdmin'],
  options?: Parameters<
    typeof groupService.endpoints.createGroupAdmin.initiate
  >[1],
) {
  return store.dispatch(
    groupService.endpoints.createGroupAdmin.initiate(data, options),
  )
}
export async function deleteGroupAdmin(
  store: any,
  data: Req['deleteGroupAdmin'],
  options?: Parameters<
    typeof groupService.endpoints.deleteGroupAdmin.initiate
  >[1],
) {
  return store.dispatch(
    groupService.endpoints.deleteGroupAdmin.initiate(data, options),
  )
}
export async function deleteGroup(
  store: any,
  data: Req['deleteGroup'],
  options?: Parameters<typeof groupService.endpoints.deleteGroup.initiate>[1],
) {
  return store.dispatch(
    groupService.endpoints.deleteGroup.initiate(data, options),
  )
}
export async function getGroup(
  store: any,
  data: Req['getGroup'],
  options?: Parameters<typeof groupService.endpoints.getGroup.initiate>[1],
) {
  return store.dispatch(groupService.endpoints.getGroup.initiate(data, options))
}
// END OF FUNCTION_EXPORTS

export const {
  useCreateGroupAdminMutation,
  useDeleteGroupAdminMutation,
  useDeleteGroupMutation,

  useGetGroupQuery,
  useGetGroupsQuery,
  // END OF EXPORTS
} = groupService

/* Usage examples:
const { data, isLoading } = useGetGroupsQuery({ id: 2 }, {}) //get hook
const [createGroups, { isLoading, data, isSuccess }] = useCreateGroupsMutation() //create hook
groupService.endpoints.getGroups.select({id: 2})(store.getState()) //access data from any function
*/
