const Home = () => {
    const homeServices = [
      { id: 1, name: 'AC repair', image: '/assets/ac-repair.jpg' },
      { id: 2, name: 'All type of Cleaning', image: '/assets/cleaning.jpg' },
      { id: 3, name: 'Painting', image: '/assets/painting.jpg' },
      { id: 4, name: 'Plumbing', image: '/assets/plumbing.jpg' },
      { id: 5, name: 'Smart repair', image: '/assets/smart-lock.jpg' },
      { id: 6, name: 'Wall panel', image: '/assets/wall-panel.jpg' },
    ];
  
    return (
      <div className="grid grid-cols-3 gap-4">
        {homeServices.map((service) => (
          <div key={service.id} className="rounded-lg shadow-md p-4 bg-white">
            <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="mt-2 text-lg font-semibold text-center">{service.name}</h2>
          </div>
        ))}
      </div>
    );
  };
  
  export default Home;
  