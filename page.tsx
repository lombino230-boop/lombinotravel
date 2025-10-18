import { Search, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-white">omio</h1>
              <nav className="hidden md:flex items-center gap-6 text-white/90 text-sm">
                <a href="#" className="hover:text-white">Treni</a>
                <a href="#" className="hover:text-white">Autobus</a>
                <a href="#" className="hover:text-white">Voli</a>
                <a href="#" className="hover:text-white">Traghetti</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white/90 hover:text-white text-sm flex items-center gap-1">
                🇮🇹 <span className="hidden sm:inline">Italiano</span>
              </button>
              <button className="text-white/90 hover:text-white text-sm">Le tue prenotazioni</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(26, 43, 73, 0.7), rgba(26, 43, 73, 0.7)), url('https://ext.same-assets.com/1102149620/48606438.jpeg')"
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Un mondo di viaggi, tutto in un'unica app
            </h2>
            <p className="text-white/90 text-lg">
              Prenota biglietti treno, autobus, aereo e traghetto
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-1">
                <label className="text-xs text-gray-600 mb-1 block">Da: Città, Stazione, Aeroporto</label>
                <Input
                  placeholder="Milano"
                  className="border-gray-300"
                />
              </div>
              <div className="md:col-span-1">
                <label className="text-xs text-gray-600 mb-1 block">A: Città, Stazione, Aeroporto</label>
                <Input
                  placeholder="Roma"
                  className="border-gray-300"
                />
              </div>
              <div className="md:col-span-1">
                <label className="text-xs text-gray-600 mb-1 block">Data</label>
                <div className="relative">
                  <Input
                    placeholder="dom 19 ott"
                    className="border-gray-300 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="text-xs text-gray-600 mb-1 block">Passeggeri</label>
                <div className="relative">
                  <Input
                    placeholder="1 - Nessuna carta sconto"
                    className="border-gray-300 pr-10"
                  />
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded" />
                Trova il mio alloggio
              </label>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
                Cerca
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <img
                src="https://ext.same-assets.com/1102149620/2963760373.jpeg"
                alt="App Omio"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Prenotare un viaggio ora è molto più semplice
              </h3>
              <p className="text-gray-600 mb-8">
                Dall'organizzazione alla partenza, nella nostra app trovi tutto ciò che ti serve per il tuo viaggio.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Biglietti mobile</h4>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    ✏️
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Prenotazioni facili da modificare, ovunque tu sia</h4>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Consigli di viaggio personalizzati</h4>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    🔔
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Aggiornamenti di viaggio in tempo reale</h4>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <img src="https://ext.same-assets.com/1102149620/676972469.svg" alt="App Store" className="h-10" />
                <img src="https://ext.same-assets.com/1102149620/2564959612.svg" alt="Google Play" className="h-10" />
                <img src="https://ext.same-assets.com/1102149620/3061663228.svg" alt="AppGallery" className="h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://ext.same-assets.com/1102149620/824934355.jpeg"
                alt="Viaggia senza barriere linguistiche"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Viaggia senza barriere linguistiche
                </h3>
                <p className="text-gray-600 text-sm">
                  Traduciamo tutti i viaggi all'estero e ti offriamo assistenza con operatori veri che parlano la tua lingua, ovunque tu sia.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://ext.same-assets.com/1102149620/1297779675.jpeg"
                alt="Un mondo, un'unica app per viaggiare"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Un mondo, un'unica app per viaggiare
                </h3>
                <p className="text-gray-600 text-sm">
                  Le modalità di prenotazione dei viaggi possono variare da Paese a Paese. Per fortuna, con Omio è sempre tutto semplice e intuitivo!
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://ext.same-assets.com/1102149620/2400060156.jpeg"
                alt="Sei tu ad avere il controllo"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Sei tu ad avere il controllo
                </h3>
                <p className="text-gray-600 text-sm">
                  Scarica la nostra app per modificare i tuoi biglietti o prenotare collegamenti alternativi, anche mentre sei in viaggio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🎁</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Tu ricevi 10 €. I tuoi amici 10 €.</h3>
                <p className="text-gray-600">Invita i tuoi amici per ricevere sconti quando viaggi</p>
              </div>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Comincia
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-gray-500 mb-4">IL MONDO DI OMIO</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              Desideri ricevere aggiornamenti, offerte voli, autobus e treni, o sconti esclusivi direttamente nella tua casella di posta?
            </h3>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="La tua email"
                className="flex-1"
              />
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Iscrivimi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            I collegamenti in treno, autobus e aereo più cercati
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <a href="#" className="text-blue-700 hover:underline">Treni Roma - Firenze</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Napoli - Milano</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Torino - Parigi</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Milano - Parigi</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Milano - Roma</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Roma - Napoli</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Roma - Milano</a>
            <a href="#" className="text-blue-700 hover:underline">Treni Napoli - Roma</a>
            <a href="#" className="text-blue-700 hover:underline">Autobus Milano - Bergamo</a>
            <a href="#" className="text-blue-700 hover:underline">Autobus Roma - Napoli</a>
            <a href="#" className="text-blue-700 hover:underline">Voli Milano - Catania</a>
            <a href="#" className="text-blue-700 hover:underline">Voli Roma - Londra</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Biglietti treno</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Frecciarossa</a></li>
                <li><a href="#" className="hover:text-white">Treni per Napoli</a></li>
                <li><a href="#" className="hover:text-white">Treni per Roma</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Biglietti autobus</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Pullman Palermo</a></li>
                <li><a href="#" className="hover:text-white">Autobus Siena Firenze</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Biglietti aerei</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Voli Venezia Madrid</a></li>
                <li><a href="#" className="hover:text-white">Voli Londra Parigi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Viaggi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Da Roma a Milano</a></li>
                <li><a href="#" className="hover:text-white">Intercity</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">omio</h2>
              <div className="flex gap-4 text-sm text-gray-400">
                <a href="#" className="hover:text-white">Imprint</a>
                <a href="#" className="hover:text-white">Termini & Condizioni</a>
                <a href="#" className="hover:text-white">Privacy</a>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">f</a>
              <a href="#" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">ig</a>
              <a href="#" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">tw</a>
              <a href="#" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">yt</a>
              <a href="#" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">in</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
