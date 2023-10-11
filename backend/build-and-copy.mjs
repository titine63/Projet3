import { spawn } from 'child_process';

const build = spawn('npx nest start --watch', [], {
  stdio: 'inherit',
});
build.on('error', (err) => {
  console.error("Erreur lors de l'exécution de la commande:", err);
});
build.stdout.on('data', (data) => {
  const output = data.toString();

  // Vous devrez adapter la condition ci-dessous pour détecter la fin de votre compilation
  if (output.includes('Found 0 errors.')) {
    // Lancez la deuxième commande
    spawn('npx copyfiles -u 1 uploads/**/* dist/uploads', [], {
      stdio: 'inherit',
    });
  }
});

build.on('exit', (code) => {
  if (code !== 0) {
    console.error('Compilation failed');
    process.exit(code);
  }
});
