const Contact = () => {
    return (
      <footer className="bg-orange-500 text-white py-16 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left: Logo + Address */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="OmahTI" className="h-10 w-10 mr-2" />
            </div>
            <p className="max-w-md leading-relaxed">
              Departemen Ilmu Komputer dan Elektronika<br />
              Fakultas Matematika dan Ilmu Pengetahuan Alam<br />
              Universitas Gadjah Mada Gedung C, Lantai 4 Sekip Utara<br />
              Bulaksumur Yogyakarta 55281
            </p>
          </div>
  
          {/* Right: Contact Us Button */}
          <div>
            <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100">
              Contact Us
            </button>
          </div>
        </div>
  
        <div className="text-center mt-8 text-sm text-white/80">
          Copyright © 2023 · OmahTI UGM
        </div>
      </footer>
    );
  };
  
  export default Contact;
  