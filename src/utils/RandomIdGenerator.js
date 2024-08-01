const generateRandomId = (prefix) => {
  const characters = "0123456789";
  let prefixChar = "";

  switch (prefix) {
    case "caregiver":
      prefixChar = "C";
      break;
    case "patient":
      prefixChar = "P";
      break;
    case "provider":
      prefixChar = "V"; // 'V' for provider
      break;
    case "superadmin":
      prefixChar = "S"; // 'S' for superadmin
      break;
    case "admin":
      prefixChar = "A"; // 'A' for admin
      break;
    case "coadmin":
      prefixChar = "O"; // 'O' for co-admin
      break;
    case "guardians":
      prefixChar = "G"; // 'G' for guardians
      break;
    case "supportadministrator":
      prefixChar = "T"; // 'T' for support administrator
      break;
    case "healthcareprofessional":
      prefixChar = "H"; // 'H' for healthcare professional
      break;
    case "compliance":
      prefixChar = "M"; // 'M' for compliance (from coMpliance)
      break;
    default:
      prefixChar = "X"; // Default to 'X' for any unknown role
  }

  let result = prefixChar;

  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export default generateRandomId;
