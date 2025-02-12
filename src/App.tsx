import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { Toaster } from "./components/ui/toaster";
import Home from "./components/home";
import HygienePage from "./pages/hygiene";
import LoginPage from "./pages/login";
import LandingPage from "./pages/landing";
import DocumentSetupPage from "./pages/documents/setup";
import DocumentsPage from "./pages/documents";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/hygiene"
            element={
              <ProtectedRoute>
                <Layout>
                  <HygienePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/setup"
            element={
              <ProtectedRoute>
                <Layout>
                  <DocumentSetupPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Layout>
                  <DocumentsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Add this before the catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
