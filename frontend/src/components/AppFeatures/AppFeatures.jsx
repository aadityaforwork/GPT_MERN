import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "AI Content Generation",
    description:
      "Generate high-quality, AI-powered content effortlessly. Our advanced algorithms create engaging articles, blog posts, and more in minutes, saving you time and effort.",
    href: "#",
    icon: ArrowPathIcon,
  },
  {
    name: "Data Security",
    description:
      "Ensure the security and privacy of your data with advanced encryption and protection measures. Our platform follows industry-leading security standards to keep your content safe.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Fast Processing",
    description:
      "Experience lightning-fast content generation with our optimized infrastructure. Our system processes requests quickly, delivering results in seconds for increased productivity.",
    href: "#",
    icon: LockClosedIcon,
  },
];

export default function AppFeatures() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Generate content effortlessly
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Unlock the power of AI content generation
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Accelerate your content creation process with our innovative features designed to revolutionize how you generate content.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
