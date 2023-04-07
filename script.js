function generatePassword() {
  const length = parseInt(document.getElementById("password-length").value);
  const uppercase = document.getElementById("include-uppercase").checked;
  const lowercase = document.getElementById("include-lowercase").checked;
  const numbers = document.getElementById("include-numbers").checked;
  const symbols = document.getElementById("include-symbols").checked;

  let chars = "";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+[]{}\\|;:'\",.<>/?";

  let password = "";
  // Generate random password
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Display generated password
  document.getElementById("generated-password").textContent = password;

  // Enable copy to clipboard button
  const copyButton = document.getElementById("copy-password");
  copyButton.disabled = false;
  copyButton.addEventListener("click", copyPasswordToClipboard);

  // Enable save to file button
  const saveButton = document.getElementById("save-password");
  saveButton.disabled = false;
  saveButton.addEventListener("click", savePasswordToFile);

  // Display password strength
  const strengthMeter = document.getElementById("password-strength");
  const strength = calculatePasswordStrength(password);
  strengthMeter.textContent = `Password Strength: ${strength}`;
  strengthMeter.style.color = getStrengthColor(strength);
}

function copyPasswordToClipboard() {
  const password = document.getElementById("generated-password").textContent;
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard!");
}

function savePasswordToFile() {
  const password = document.getElementById("generated-password").textContent;
  const blob = new Blob([password], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "password.txt");
}

function calculatePasswordStrength(password) {
  let strength = 0;
  // Add points for length
  strength += Math.min(password.length, 20);

  // Add points for complexity
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[!@#$%^&*()_+[\]{}\\|;:'",.<>/?]/)) strength++;

  // Deduct points for repeated characters
  const counts = {};
  for (let char of password) {
    counts[char] = (counts[char] || 0) + 1;
  }
  const repeated = Object.values(counts)
    .filter((count) => count > 1)
    .reduce((a, b) => a + b, 0);
  strength -= repeated;

  // Cap strength at 10
  strength = Math.max(Math.min(strength, 10), 0);

  return strength;
}

function getStrengthColor(strength) {
  if (strength >= 8) return "#007f00"; // green
  if (strength >= 6) return "#7f7f00"; // yellow
  if (strength >= 4) return "#7f3f00"; // orange
  return "#7f0000"; // red
}

document.getElementById("generate-password").addEventListener("click", generatePassword);
