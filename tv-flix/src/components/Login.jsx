import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Get credentials from environment variables
    const validUsername = import.meta.env.VITE_AUTH_USERNAME || 'giuse';
    const validPassword = import.meta.env.VITE_AUTH_PASSWORD || 'giuse2';

    // Strict authentication check
    setTimeout(() => {
      // Verifica esatta delle credenziali - deve corrispondere esattamente
      if (credentials.username.trim() === validUsername && credentials.password === validPassword) {
        onLogin(validUsername); // Usa sempre il nome utente corretto
      } else {
        // Messaggio di errore più informativo
        setError('Accesso negato: credenziali non valide');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 rounded-xl text-white font-black text-2xl shadow-glow">
              TV
            </span>
            <span className="gradient-text font-black text-3xl tracking-tight">
              Flix
            </span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-neutral-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Accedi al tuo account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Inserisci il tuo username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Inserisci la tua password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg hover:from-primary-500 hover:to-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-200 shadow-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Accesso in corso...
                  </>
                ) : (
                  'Accedi'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Accesso riservato. Solo credenziali autorizzate.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-white/40 text-xs">
          © 2024 TVFlix. Tutti i diritti riservati.
        </div>
      </div>
    </div>
  );
};

export default Login;