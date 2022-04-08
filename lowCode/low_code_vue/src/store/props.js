const state  =  {
    globalWhere:{}
}

const mutation = {
    SET_CONFIG_WHERE(state,where){
        const _where = {}
        state.globalWhere = {
            ...state.globalWhere,
            ..._where,
            
        }
    }
}

const actions  = {
    addWhere({commit},where){
        commit('SET_CONFIG_WHERE',where)
    }
}

export default {
    namespaced:true,
    state,
    mutation,
    actions
}