import React, { useState, useEffect } from 'react';
import { getTestCases, addTestCase, updateTestCase, deleteTestCase } from './testcaseService';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const TestCaseList = () => {
  const [testCases, setTestCases] = useState([]);
  const [newTestCase, setNewTestCase] = useState({
    name: '',
    description: '',
    status: '',
    estimateTime: '',
    module: '',
    priority: ''
  });

  useEffect(() => {
    fetchTestCases();

    socket.on('testcase_added', (testCase) => {
      setTestCases((prev) => [...prev, testCase]);
    });

    socket.on('testcase_updated', (updatedTestCase) => {
      setTestCases((prev) => prev.map((tc) => (tc._id === updatedTestCase._id ? updatedTestCase : tc)));
    });

    socket.on('testcase_deleted', (deletedTestCase) => {
      setTestCases((prev) => prev.filter((tc) => tc._id !== deletedTestCase._id));
    });

    return () => {
      socket.off('testcase_added');
      socket.off('testcase_updated');
      socket.off('testcase_deleted');
    };
  }, [newTestCase]);

  const fetchTestCases = async () => {
    const response = await getTestCases();
    setTestCases(response.data);
  };

  const handleAddTestCase = async () => {
    await addTestCase(newTestCase);
    setNewTestCase({ name: '', description: '', status: '', estimateTime: '', module: '', priority: '' });
  };

  const handleUpdateTestCase = async (id, updatedTestCase) => {
    await updateTestCase(id, updatedTestCase);
    fetchTestCases();
  };

  const handleDeleteTestCase = async (id) => {
    await deleteTestCase(id);
    fetchTestCases();
  };

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Search issue..."
          style={{ flex: 1 }}
        />
        <button>Search</button>
      </header>
      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          value={newTestCase.name}
          onChange={(e) => setNewTestCase({ ...newTestCase, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTestCase.description}
          onChange={(e) => setNewTestCase({ ...newTestCase, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Estimate Time"
          value={newTestCase.estimateTime}
          onChange={(e) => setNewTestCase({ ...newTestCase, estimateTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Module"
          value={newTestCase.module}
          onChange={(e) => setNewTestCase({ ...newTestCase, module: e.target.value })}
        />
        <input
          type="text"
          placeholder="Priority"
          value={newTestCase.priority}
          onChange={(e) => setNewTestCase({ ...newTestCase, priority: e.target.value })}
        />
        <select
          value={newTestCase.status}
          onChange={(e) => setNewTestCase({ ...newTestCase, status: e.target.value })}
        >
          <option value="">Select</option>
          <option value="PASS">PASS</option>
          <option value="FAIL">FAIL</option>
        </select>
        <button onClick={handleAddTestCase}>Add Test Case</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Test Case Name</th>
            <th>Estimate Time</th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase) => (
            <tr key={testCase._id}>
              <td>
                <input
                  type="text"
                  value={testCase.name}
                  onChange={(e) => handleUpdateTestCase(testCase._id, { ...testCase, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={testCase.estimateTime}
                  onChange={(e) => handleUpdateTestCase(testCase._id, { ...testCase, estimateTime: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={testCase.module}
                  onChange={(e) => handleUpdateTestCase(testCase._id, { ...testCase, module: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={testCase.priority}
                  onChange={(e) => handleUpdateTestCase(testCase._id, { ...testCase, priority: e.target.value })}
                />
              </td>
              <td>
                <select
                  value={testCase.status}
                  onChange={(e) => handleUpdateTestCase(testCase._id, { ...testCase, status: e.target.value })}
                >
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteTestCase(testCase._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestCaseList;



