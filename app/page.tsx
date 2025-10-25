export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            JD
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Welcome to my personal space where I share a bit about myself and my passion for poetry.
          </p>
        </header>

        {/* Profile Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Hello, I&apos;m John Doe
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                I&apos;m a passionate developer and poetry enthusiast who believes in the power of words 
                to inspire and connect people. When I&apos;m not coding, you&apos;ll find me exploring the 
                beauty of language through verse.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I love creating digital experiences that bring joy to users while finding inspiration 
                in the rhythm and flow of poetry.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Full-Stack Developer</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Poetry Enthusiast</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Creative Thinker</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Lifelong Learner</span>
              </div>
            </div>
          </div>
        </section>

        {/* Poem Section */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            A Poem Close to My Heart
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center italic">
                &ldquo;The Road Not Taken&rdquo;
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="italic">
                  Two roads diverged in a yellow wood,<br />
                  And sorry I could not travel both<br />
                  And be one traveler, long I stood<br />
                  And looked down one as far as I could<br />
                  To where it bent in the undergrowth;
                </p>
                <p className="italic">
                  Then took the other, as just as fair,<br />
                  And having perhaps the better claim,<br />
                  Because it was grassy and wanted wear;<br />
                  Though as for that the passing there<br />
                  Had worn them really about the same,
                </p>
                <p className="italic">
                  And both that morning equally lay<br />
                  In leaves no step had trodden black.<br />
                  Oh, I kept the first for another day!<br />
                  Yet knowing how way leads on to way,<br />
                  I doubted if I should ever be back.
                </p>
                <p className="italic">
                  I shall be telling this with a sigh<br />
                  Somewhere ages and ages hence:<br />
                  Two roads diverged in a wood, and I—<br />
                  I took the one less traveled by,<br />
                  And that has made all the difference.
                </p>
              </div>
              <p className="text-right text-gray-500 dark:text-gray-400 mt-6 font-medium">
                — Robert Frost
              </p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300 italic">
                This poem reminds me that every choice we make shapes our journey, 
                and sometimes the unconventional path leads to the most beautiful destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Thank you for visiting my little corner of the web. 
            <span className="block mt-2">May your journey be filled with poetry and purpose.</span>
          </p>
        </footer>
      </div>
    </div>
  );
}




