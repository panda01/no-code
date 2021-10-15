import type { vaultTypes, nestedObj } from './components/Types';

function dataStore() {
  const vault: nestedObj = {};
  return function(key: string, val?: vaultTypes|nestedObj) {
    const oldVal = vault[key];
    if(val !== undefined) {
      vault[key] = val;
    }
    return oldVal;
  }
}


export default dataStore;
