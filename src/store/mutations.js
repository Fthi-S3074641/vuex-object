import * as types from './mutation-types'

export const mutations = {
  [types.CREATE_ITEM] (state, payload) {
    state.Items.push(payload)
  },

  [types.UPDATE_ITEM] (state, payload) {
    Object.assign(state.Items[payload.index], { text: payload.text });
  },

  [types.DELETE_ITEM] (state, payload) {
    state.Items.splice(payload,1)
  }

}