import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import BlogIndexPage from "./components/blog/BlogIndexPage";
import BlogPostPage from "./components/blog/BlogPostPage";
import StudioPage from "./studio/StudioPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/studio/*" element={<StudioPage />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
