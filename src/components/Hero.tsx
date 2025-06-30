import React from 'react';
import { Play, Star, TrendingUp, BookOpen, Plane, Globe } from 'lucide-react';
import { books } from '../data/books';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { setCurrentBook, setCurrentView, updateAudioPlayer, setCurrentChapter } = useApp();
  const { t } = useLanguage();
  const featuredBook = books.find(book => book.isPopular && book.isNew) || books[0];

  const handlePlayBook = () => {
    setCurrentBook(featuredBook);
    
    // If the book has chapters, play the first chapter
    if (featuredBook.chapters && featuredBook.chapters.length > 0) {
      const firstChapter = featuredBook.chapters[0];
      setCurrentChapter(firstChapter);
      updateAudioPlayer({
        currentChapter: firstChapter,
        isPlaying: true,
        currentTime: 0
      });
    } else {
      // If no chapters, play the main audio
      updateAudioPlayer({
        isPlaying: true,
        currentTime: 0
      });
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-200/30 dark:bg-cyan-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-violet-200/30 dark:bg-violet-500/10 rounded-full blur-xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp size={16} />
                <span>Trending</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t.heroTitle}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Partnership Information */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Ethiopian Airlines</span>
                  </div>
                  <span className="text-gray-400">×</span>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Nordic ICT</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  This platform is developed by Nordic ICT in partnership with Ethiopian Airlines to review and evaluate Amharic audiobooks for in-flight entertainment, bringing Ethiopian culture and literature to travelers worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentView('library')}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <BookOpen size={24} />
                <span>{t.exploreBooks}</span>
              </button>
              
              <button
                onClick={() => setCurrentView('about')}
                className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span>{t.aboutUs}</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.books}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.languages}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t.narrators}</div>
              </div>
            </div>
          </div>

          {/* Featured Book */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[3/4] relative">
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <button
                  onClick={handlePlayBook}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play size={32} className="text-emerald-600 ml-1" />
                  </div>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(featuredBook.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {featuredBook.rating} ({featuredBook.totalRatings})
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {featuredBook.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  by {featuredBook.author}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {formatDuration(featuredBook.duration)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {featuredBook.language}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};