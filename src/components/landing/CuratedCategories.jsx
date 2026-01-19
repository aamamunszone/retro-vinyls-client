import { ArrowRight } from 'lucide-react';

export default function CuratedCategories() {
  const categories = [
    {
      id: 1,
      name: 'Classic Rock',
      description: 'Legendary albums that defined generations',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '2,400+ records',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 2,
      name: 'Jazz Essentials',
      description: 'Smooth sounds from the golden age of jazz',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '1,800+ records',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 3,
      name: 'Soul & Blues',
      description: 'Heartfelt melodies that touch the soul',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '1,200+ records',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      name: 'Folk & Country',
      description: 'Stories told through timeless melodies',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      count: '900+ records',
      color: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <section id="categories" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">
            Curated Categories
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto">
            Explore our carefully organized collection by genre and era
          </p>
          <div className="w-24 h-1 bg-[#CC5500] mx-auto mt-6"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Background Image */}
              <div className="relative h-80">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                ></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm font-medium">
                        {category.count}
                      </span>
                      <div className="bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-3xl transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-[#4A4A4A] mb-6">
            Can't find what you're looking for?
          </p>
          <button className="bg-[#CC5500] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B84A00] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
