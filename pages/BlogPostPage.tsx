import React, { useState, useEffect } from 'react';
import { blogData, type BlogPost } from '../data/blogData';
import Icon from '../components/Icon';

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
  if (headings.length === 0) return null;

  return (
    <div className="sticky top-28">
      <h3 className="text-lg font-bold text-brand-dark mb-4 border-b pb-2">Daftar Isi</h3>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map(heading => (
            <li key={heading.id}>
              <a 
                href={`#${heading.id}`}
                className="text-slate-600 hover:text-brand-secondary transition-colors"
                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const RelatedPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <a href={`#/blog/${post.slug}`} className="bg-slate-50 rounded-xl overflow-hidden flex flex-col group border border-slate-200 hover:border-brand-secondary transition-all">
        <img src={post.image} alt={post.title} className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-4 flex flex-col flex-grow">
            <h4 className="text-md font-bold text-brand-dark mb-1 group-hover:text-brand-secondary transition-colors">{post.title}</h4>
            <p className="text-xs text-slate-500">{post.date}</p>
        </div>
    </a>
);

const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [contentWithIds, setContentWithIds] = useState('');
  const post = blogData.find(p => p.slug === slug);

  // Find related posts based on tags
  const relatedPosts = post 
    ? blogData.filter(p => {
        if (p.slug === post.slug) return false; // Exclude the current post
        return p.tags.some(tag => post.tags.includes(tag)); // Find posts with at least one common tag
      }).slice(0, 2) // Limit to 2 related posts
    : [];

  useEffect(() => {
    if (!post) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;

    const newHeadings: Heading[] = [];
    const headingElements = tempDiv.querySelectorAll('h2, h3');

    headingElements.forEach((el, index) => {
      const text = el.textContent || '';
      const level = parseInt(el.tagName.substring(1), 10);
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      const uniqueId = `${id}-${index}`;
      el.id = uniqueId;

      newHeadings.push({ id: uniqueId, text, level });
    });
    
    setHeadings(newHeadings);
    setContentWithIds(tempDiv.innerHTML);
    
    // Smooth scrolling for hash links within the TOC
    const handleTocLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const nav = target.closest('nav');
      if (nav && target.tagName === 'A' && target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    
    document.addEventListener('click', handleTocLinkClick);

    return () => {
      document.removeEventListener('click', handleTocLinkClick);
    };

  }, [post]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Artikel Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, artikel yang Anda cari tidak ada.</p>
        <a href="#/blog" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Blog</a>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Post Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <a href="#/blog" className="text-sm font-semibold text-brand-secondary hover:underline mb-4 inline-block">
            &larr; Kembali ke Blog
          </a>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">{post.title}</h1>
          <div className="mt-6 flex justify-center items-center space-x-4 text-slate-500">
            <span>Oleh: {post.author}</span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Post Body with TOC */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <TableOfContents headings={headings} />
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <article>
              <img src={post.image} alt={post.title} className="rounded-2xl shadow-lg mb-8 w-full object-cover" style={{aspectRatio: '16/9'}} />
              
              {/* Table of Contents (Mobile) */}
              <div className="lg:hidden mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <TableOfContents headings={headings} />
              </div>
              
              <div
                className="prose lg:prose-lg max-w-none text-slate-600 prose-h2:scroll-mt-28 prose-h3:scroll-mt-28"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />
            </article>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8">Artikel Terkait</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {relatedPosts.map(relatedPost => (
                    <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;