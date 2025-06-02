
import { Users, Target, Award, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "5+", label: "Years Experience" },
    { number: "500+", label: "Products Available" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      bio: "Former Olympic athlete with 15 years in fitness industry"
    },
    {
      name: "Mike Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Equipment engineer specializing in commercial-grade fitness gear"
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Certified personal trainer and fitness consultant"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We source only the highest quality equipment from trusted manufacturers worldwide."
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Your fitness goals are our priority. We provide personalized service and support."
    },
    {
      icon: Award,
      title: "Expert Approved",
      description: "All our products are tested and approved by fitness professionals and athletes."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We stay ahead of fitness trends to bring you the latest and most effective equipment."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FitHaven</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're passionate about helping people achieve their fitness goals by providing access to 
            professional-grade gym equipment for home and commercial use.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded in 2019, FitHaven began with a simple mission: to make professional-grade 
                fitness equipment accessible to everyone. What started as a small warehouse operation 
                has grown into a trusted partner for fitness enthusiasts, personal trainers, and 
                commercial gyms worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe that everyone deserves access to quality fitness equipment, regardless of 
                their budget or space constraints. That's why we work directly with manufacturers to 
                bring you the best products at competitive prices, backed by our commitment to 
                exceptional customer service.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Our warehouse"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary-600 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core principles guide everything we do at FitHaven
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The passionate people behind FitHaven who make it all possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
