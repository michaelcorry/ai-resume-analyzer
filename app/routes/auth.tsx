import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export const meta = () => ([
    {title: "Resume Studio | Sign In"},
    {name: "description", content: "Log into your account."},
]);

const Auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const nextParam = location.search.split("next=")[1];
    const nextPath = nextParam ? decodeURIComponent(nextParam) : "/";
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate(nextPath);
    }, [auth.isAuthenticated, navigate, nextPath]);

    return (
        <main className="app-shell min-h-screen flex items-center justify-center px-4 py-10">
            <section className="auth-layout panel w-full max-w-5xl overflow-hidden">
                <aside className="auth-aside">
                    <p className="auth-eyebrow">Resume Studio</p>
                    <h1 className="auth-title">Sign in to continue your resume workflow</h1>
                    <p className="auth-subtitle">
                        Upload resumes, track ATS scoring, and review actionable feedback in one place.
                    </p>
                    <ul className="auth-feature-list">
                        <li>Secure cloud-backed resume history</li>
                        <li>Structured ATS insights and scoring</li>
                        <li>Fast analysis for each application target</li>
                    </ul>
                </aside>

                <div className="auth-form-wrap">
                    <div className="auth-form-card panel">
                        <div className="space-y-2 text-center">
                            <h2 className="auth-form-heading">Welcome back</h2>
                            <p className="auth-form-copy">Use your Puter account to access Resume Studio.</p>
                        </div>

                        {isLoading ? (
                            <button className="auth-button animate-pulse" type="button" disabled>
                                Signing you in...
                            </button>
                        ) : auth.isAuthenticated ? (
                            <button className="auth-button" type="button" onClick={auth.signOut}>
                                Log out
                            </button>
                        ) : (
                            <button className="auth-button" type="button" onClick={auth.signIn}>
                                Sign in with Puter
                            </button>
                        )}

                        <p className="auth-footnote">By continuing, you agree to authenticate with your Puter account.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Auth;
