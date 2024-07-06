const generateRandomId = (prefix) => {
    const characters = '0123456789';
    const prefixChar = prefix === 'caregiver' ? 'C' : 'P';
    let result = prefixChar;
    
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
  };
 export default generateRandomId