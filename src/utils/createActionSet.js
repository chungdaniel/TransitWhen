// The following code is inspired by action-helper from GitPoint, which is under the MIT license
const createActionSet = (actionName) => ({
    PENDING: `${actionName}_PENDING`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`
});

export default createActionSet;
