import * as user from './user'
import * as types from './types'
import * as messages from './messages'
import * as events from './events'

export interface ApplicationState {
    user: types.user,
    messages: types.messsage,
    events: types.events
}

export const reducers = {
    user: user.reducer,
    messages: messages.reducer,
    events: events.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}