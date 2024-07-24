import axios from 'axios';

const API_URL = 'http://localhost:5000/testcases';

export const getTestCases = () => axios.get(API_URL);
export const addTestCase = (testCase) => axios.post(API_URL, testCase);
export const updateTestCase = (id, updatedTestCase) => axios.put(`${API_URL}/${id}`, updatedTestCase);
export const deleteTestCase = (id) => axios.delete(`${API_URL}/${id}`);
