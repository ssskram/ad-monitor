import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.events = {
    events: []
}

export const actionCreators = {
    loadEvents: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://az-table.azurewebsites.us/activeDirectory/riskEvents", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_AZ_TABLE
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadEvents, events: data })
            })
    }
}

export const reducer: Reducer<types.events> = (state: types.events, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadEvents:
            return { ...state, events: action.events }
    }

    return state || unloadedState
}