// components/Beauty.js
const Beauty = () => {
    const beautyServices = [
      { id: 1, name: 'Spa for Women', image: '/assets/spa-womens.jpg' },
      { id: 2, name: 'Spa for Men', image: '/assets/spa-mens.jpg' },
      { id: 3, name: 'Haircut for Women', image: '/assets/womens-salon.jpg' },
      { id: 4, name: 'Haircut for Men', image: '/assets/mens-salon.jpg' },
      { id: 5, name: 'Haircut for Kids', image: '/assets/kids-haircut.jpg' },
      { id: 6, name: 'Beauty Parlour for Women', image: '/assets/beauty-parlour.jpg' },
    ];
  
    return (
      <div className="grid grid-cols-3 gap-4">
        {beautyServices.map((service) => (
          <div key={service.id} className="rounded-lg shadow-md p-4 bg-white">
            <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="mt-2 text-lg font-semibold text-center">{service.name}</h2>
          </div>
        ))}
      </div>
    );
  };
  
  export default Beauty;
  