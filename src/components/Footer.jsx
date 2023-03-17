import React from 'react';

const Footer = () => {
return (
<footer aria-label="Site Footer" className="bg-white">
  <div
    className="margin-auto  px-4 py-16 mx-auto space-y-3 sm:px-6 lg:space-y-16 lg:px-3"
  >
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
      <div>
        <img src="data:image/png;base64,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"
            width="150"
            height="100"
        />

        <p className="max-w-xs mt-4 text-gray-500">
          RideStack is not a real car website. These products are not real. This is a project made by Bobby Whitacre, Zeljko (Zack) Maric, and Ana Tran from the 2209-fbt-ct-web-pt cohort of FullStackAcademy.
        </p>

        <ul className="flex gap-6 mt-8">
          <li>
            <a
              href="https://www.facebook.com/FullstackAcademy/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Facebook</span>

              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/fullstackacademy/?hl=en"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Instagram</span>

              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/fullstack?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Twitter</span>

              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="https://github.com/FullstackAcademy"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">GitHub</span>

              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3"
      >
        <div>
          <p className="font-medium text-gray-900">Ana Tran</p>

          <nav aria-label="Footer Navigation - Services" className="mt-6">
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://www.linkedin.com/in/tranana/" className="text-gray-700 transition hover:opacity-75">
                  LinkedIn
                </a>
              </li>

              <li>
                <a href="https://github.com/anahuynh27" className="text-gray-700 transition hover:opacity-75">
                  GitHub
                </a>
              </li>

            </ul>
          </nav>
        </div>

        <div>
          <p className="font-medium text-gray-900">Bobby Whitacre</p>

          <nav aria-label="Footer Navigation - Company" className="mt-6">
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://www.linkedin.com/in/bobby-whitacre/" className="text-gray-700 transition hover:opacity-75">
                  LinkedIn
                </a>
              </li>

              <li>
                <a href="https://github.com/BobbyWhitacre27" className="text-gray-700 transition hover:opacity-75">
                  GitHub
                </a>
              </li>

              <li>
                <a href="https://grand-kringle-c9625f.netlify.app/" className="text-gray-700 transition hover:opacity-75">
                  Portfolio
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <p className="font-medium text-gray-900">Zeljko (Zack) Maric</p>

          <nav aria-label="Footer Navigation - Company" className="mt-6">
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://www.linkedin.com/in/maric-zeljko/" className="text-gray-700 transition hover:opacity-75">
                  LinkedIn
                </a>
              </li>

              <li>
                <a href="https://github.com/zeljkomaric95" className="text-gray-700 transition hover:opacity-75">
                  GitHub
                </a>
              </li>
                
            </ul>
          </nav>
        </div>

       
      </div>
    </div>

    <p className="text-xs text-gray-500">
      &copy; 2023. RideStack. All rights reserved. FullStack Academy
    </p>
  </div>
</footer>
    )
}

export default Footer;