export const DEFAULT = {
  QUESTION_AMOUNT: 10,
}

const BASE = {
  API_URL: 'https://opentdb.com/api.php?',
}

export const API = {
  URL: 'https://opentdb.com/api.php?',
  getURL: (amount = 10, categoryID = 0) =>
    `${BASE.API_URL}amount=${amount}&category=${categoryID}`,
}

const ANSWER_TYPE = {
  TIME_OUT: 'TIME_OUT',
}
