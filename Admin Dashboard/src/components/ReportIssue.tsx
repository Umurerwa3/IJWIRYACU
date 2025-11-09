import React, { useState, useRef, useEffect } from 'react';
import { FileText, Phone, MessageSquare, Camera, MapPin, Send, X, Navigation } from 'lucide-react';

// Add Google Maps type declarations
declare global {
  interface Window {
    google: typeof google;
  }
}

interface ReportIssueProps {
  language: 'en' | 'rw';
  isAdmin?: boolean;
}

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface FormData {
  district: string;
  sector: string;
  issueType: string;
  description: string;
  anonymous: boolean;
  contact: string;
  photos: File[];
  location: Location;
}

export const ReportIssue: React.FC<ReportIssueProps> = ({ language, isAdmin = false }) => {
  const [formData, setFormData] = useState<FormData>({
    district: '',
    sector: '',
    issueType: '',
    description: '',
    anonymous: false,
    contact: '',
    photos: [],
    location: { lat: 0, lng: 0, address: '' }
  });

  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [mapError, setMapError] = useState<string>('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: 'Report an Issue',
      subtitle: 'Help us improve your community by reporting issues',
      webForm: 'Web Form',
      smsUssd: 'SMS/USSD',
      whatsapp: 'WhatsApp',
      district: 'District',
      sector: 'Sector',
      issueType: 'Issue Type',
      description: 'Description',
      contact: 'Phone Number (Optional)',
      anonymous: 'Report Anonymously',
      submit: 'Submit Report',
      smsInstructions: 'Send SMS to 4545 (Free)',
      whatsappInstructions: 'Chat with us on WhatsApp',
      photoUpload: 'Add Photo',
      location: 'Add Location',
      removePhoto: 'Remove Photo',
      selectLocation: 'Select Location',
      currentLocation: 'Use Current Location',
      searchLocation: 'Search Location',
      locationPlaceholder: 'Enter address or landmark',
      photosAdded: 'Photos Added',
      locationAdded: 'Location Added',
      removeLocation: 'Remove Location',
      maxPhotos: 'Maximum 3 photos allowed',
      photoError: 'Please select a valid image file',
      locationError: 'Please select a valid location',
      selectDistrict: 'Select District',
      selectSector: 'Select Sector',
      selectIssue: 'Select Issue Type',
      descriptionPlaceholder: 'Describe the issue in detail...',
      contactPlaceholder: '+250 7XX XXX XXX',
      issueTypes: {
        water: 'Water & Sanitation',
        roads: 'Roads & Infrastructure', 
        health: 'Healthcare',
        education: 'Education',
        electricity: 'Electricity',
        agriculture: 'Agriculture',
        security: 'Security',
        other: 'Other'
      },
      loadingMap: 'Loading map...',
      mapError: 'Error loading map',
      getCurrentLocation: 'Get Current Location',
      closeMap: 'Close Map',
      locationOnMap: 'Location on Map',
      noLocation: 'No location selected',
      locationPermissionDenied: 'Location permission denied',
      locationUnavailable: 'Location unavailable'
    },
    rw: {
      title: 'Tanga Ikibazo',
      subtitle: 'Dufashe ngo dunonosore umuturage ukubiyemo utanga ibibazo',
      webForm: 'Ifishi ku Rubuga',
      smsUssd: 'SMS/USSD',
      whatsapp: 'WhatsApp',
      district: 'Akarere',
      sector: 'Umurenge',
      issueType: 'Ubwoko bw\'Ikibazo',
      description: 'Ibisobanuro',
      contact: 'Nimero ya Telefoni (Bitari Ngombwa)',
      anonymous: 'Tanga Ikibazo Utavuze Amazina',
      submit: 'Ohereza Raporo',
      smsInstructions: 'Ohereza SMS kuri 4545 (Ubuntu)',
      whatsappInstructions: 'Tugan\'ire kuri WhatsApp',
      photoUpload: 'Ongeraho Ifoto',
      location: 'Ongeraho Aho Biherereye',
      removePhoto: 'Kuraho Ifoto',
      selectLocation: 'Hitamo Aho Biherereye',
      currentLocation: 'Gukoresha Aho Uri',
      searchLocation: 'Shakisha Aho Biherereye',
      locationPlaceholder: 'Injiza aderesi cyangwa ikimenyetso',
      photosAdded: 'Ifoto Zongewe',
      locationAdded: 'Aho Biherereye Byongewe',
      removeLocation: 'Kuraho Aho Biherereye',
      maxPhotos: 'Ifoto 3 gusa zirashoboka',
      photoError: 'Hitamo ifoto nziza',
      locationError: 'Hitamo aho biherereye nziza',
      selectDistrict: 'Hitamo Akarere',
      selectSector: 'Hitamo Umurenge',
      selectIssue: 'Hitamo Ubwoko bw\'Ikibazo',
      descriptionPlaceholder: 'Sobanura ikibazo mu buryo burambuye...',
      contactPlaceholder: '+250 7XX XXX XXX',
      issueTypes: {
        water: 'Amazi n\'Isuku',
        roads: 'Imihanda n\'Ibikorwa remezo',
        health: 'Ubuvuzi',
        education: 'Uburezi',
        electricity: 'Amashanyarazi',
        agriculture: 'Ubuhinzi',
        security: 'Umutekano',
        other: 'Ikindi'
      },
      loadingMap: 'Ikarita irasubirwa...',
      mapError: 'Ikibazo cyo gusubiza ikarita',
      getCurrentLocation: 'Shakisha Aho Uri',
      closeMap: 'Funga Ikarita',
      locationOnMap: 'Aho Biherereye ku Ikarita',
      noLocation: 'Nta ho biherereye byahiswemo',
      locationPermissionDenied: 'Ntibemewe gusobanukirwa aho uri',
      locationUnavailable: 'Aho uri ntibisobanuka'
    }
  };

  const t = translations[language];

  const districts = [
    'Kigali', 'Musanze', 'Rubavu', 'Nyabihu', 'Ngororero', 'Rusizi', 'Nyamasheke',
    'Karongi', 'Rutsiro', 'Gasabo', 'Kicukiro', 'Nyarugenge', 'Huye', 'Nyanza',
    'Gisagara', 'Nyaruguru', 'Nyamagabe', 'Kamonyi', 'Muhanga', 'Ruhango',
    'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera', 'Rwamagana'
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location'
          };
          setUserLocation(location);
          setFormData(prev => ({ ...prev, location }));
          initializeMap(location);
        },
        (error) => {
          setMapError('Error getting location: ' + error.message);
        }
      );
    } else {
      setMapError('Geolocation is not supported by your browser');
    }
  };

  const initializeMap = (location: Location) => {
    if (!mapRef.current || !window.google) return;

    const mapOptions: google.maps.MapOptions = {
      center: { lat: location.lat, lng: location.lng },
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Add search box
    const searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('location-search') as HTMLInputElement
    );

    // Bias the SearchBox results towards current map's viewport
    newMap.addListener('bounds_changed', () => {
      searchBox.setBounds(newMap.getBounds() as google.maps.LatLngBounds);
    });

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // Update map and marker
      newMap.setCenter(place.geometry.location);
      if (marker) {
        marker.setPosition(place.geometry.location);
      } else {
        const newMarker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: newMap,
          title: place.name || 'Selected Location',
          draggable: true
        });
        setMarker(newMarker);
      }

      // Update form data
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || place.name || 'Selected Location'
      };
      setFormData(prev => ({ ...prev, location }));
    });

    const newMarker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: newMap,
      title: 'Your Location',
      draggable: true
    });

    // Add drag end listener to marker
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (position) {
        const location = {
          lat: position.lat(),
          lng: position.lng(),
          address: 'Selected Location'
        };
        setFormData(prev => ({ ...prev, location }));
      }
    });

    setMarker(newMarker);
  };

  useEffect(() => {
    if (showMap && userLocation && !map) {
      initializeMap(userLocation);
    }
  }, [showMap, userLocation, map]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(language === 'en' ? 'Report submitted successfully!' : 'Raporo yoherejwe neza!');
    setFormData({
      district: '',
      sector: '',
      issueType: '',
      description: '',
      anonymous: false,
      contact: '',
      photos: [],
      location: { lat: 0, lng: 0, address: '' }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (formData.photos.length + files.length > 3) {
        alert(t.maxPhotos);
        return;
      }
      
      const newPhotos = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      if (newPhotos.length !== files.length) {
        alert(t.photoError);
        return;
      }

      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
    setShowLocationPicker(false);
  };

  const removeLocation = () => {
    setFormData(prev => ({
      ...prev,
      location: { lat: 0, lng: 0, address: '' }
    }));
  };

  const handleLocationButtonClick = () => {
    if (isAdmin) {
      setShowMap(true);
      getCurrentLocation();
    } else {
      setShowLocationPicker(!showLocationPicker);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.district}
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">{t.selectDistrict}</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.issueType}
              </label>
              <select
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">{t.selectIssue}</option>
                {Object.entries(t.issueTypes).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.description}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t.descriptionPlaceholder}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Camera className="w-4 h-4" />
                {t.photoUpload}
              </button>
              {formData.photos.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-50">
                  <div className="text-sm text-gray-500 mb-2">{t.photosAdded}:</div>
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                      <span className="text-sm truncate">{photo.name}</span>
                      <button
                        onClick={() => removePhoto(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={handleLocationButtonClick}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {formData.location.address ? t.locationAdded : t.location}
              </button>
              
              {showMap && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl mx-4">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="text-xl font-bold text-gray-800">{t.locationOnMap}</h3>
                      <button
                        onClick={() => setShowMap(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      {mapError ? (
                        <div className="text-red-500 text-center py-4">{mapError}</div>
                      ) : !userLocation ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
                          <p>{t.loadingMap}</p>
                        </div>
                      ) : (
                        <>
                          <input
                            id="location-search"
                            type="text"
                            placeholder={t.locationPlaceholder}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <div ref={mapRef} className="w-full h-[400px] rounded-lg"></div>
                        </>
                      )}
                    </div>
                    <div className="p-4 border-t flex justify-end">
                      <button
                        onClick={() => setShowMap(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {t.closeMap}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!isAdmin && showLocationPicker && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <div className="space-y-3">
                    <button
                      onClick={getCurrentLocation}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                    >
                      <Navigation className="w-4 h-4" />
                      {t.getCurrentLocation}
                    </button>
                    
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.locationPlaceholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleLocationSelect({
                              lat: -1.9403,
                              lng: 29.8739,
                              address: 'Kigali, Rwanda'
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.location.address && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 z-50">
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm truncate">{formData.location.address}</span>
                    <button
                      onClick={removeLocation}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.contact}
            </label>
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder={t.contactPlaceholder}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
              className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              {t.anonymous}
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Send className="w-4 h-4" />
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
};