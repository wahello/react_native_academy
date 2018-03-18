import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import TodoActions from '../Redux/TodoRedux'

export function * getAllLists (api) {
  const response = yield call(api.getAllLists)

  if (response.ok) {
    const lists = path(['data', 'results'], response)
    yield put(TodoActions.allListsSuccess(lists))
  } else {
    yield put(TodoActions.requestError())
  }
}

export function * toggleCompleted (api, { listId, itemId, completed }) {
  const response = yield call(api.updateTodoItem, listId, itemId, { completed })

  if (response.ok) {
    // For simplicity, we are refetching all lists
    yield put(TodoActions.allListsRequest())
  } else {
    yield put(TodoActions.requestError())
  }
}

export function * deleteTodoItem (api, { listId, itemId }) {
  const response = yield call(api.deleteTodoItem, listId, itemId)

  if (response.ok) {
    // For simplicity, we are refetching all lists
    yield put(TodoActions.allListsRequest())
  } else {
    yield put(TodoActions.requestError())
  }
}

export function * deleteTodoList (api, { listId }) {
  const response = yield call(api.deleteTodoList, listId)

  if (response.ok) {
    // For simplicity, we are refetching all lists
    yield put(TodoActions.allListsRequest())
  } else {
    yield put(TodoActions.requestError())
  }
}

export function * addListItem (api, { listId, itemData }) {
  const response = yield call(api.addListItem, listId, itemData)

  if (response.ok) {
    // For simplicity, we are refetching all lists
    yield put(TodoActions.allListsRequest())
  } else {
    yield put(TodoActions.requestError())
  }
}

export function * addList (api, { listData }) {
  const response = yield call(api.addList, listData)

  if (response.ok) {
    // For simplicity, we are refetching all lists
    yield put(TodoActions.allListsRequest())
  } else {
    yield put(TodoActions.requestError())
  }
}
