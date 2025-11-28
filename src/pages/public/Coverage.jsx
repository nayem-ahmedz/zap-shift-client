import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from "react-router";
import { useRef } from "react";

export default function Coverage() {
    const mapRef = useRef(null);
    const warehouses = useLoaderData();
    console.log(warehouses)
    const position = [23.8041, 90.4152] // dhaka
    const handleSearch = e => {
        e.preventDefault();
        const search = e.target.district.value;
        const district = warehouses.find(house => house.district.toLowerCase().includes(search.toLowerCase()));
        if(district){
            const cord = [district.latitude, district.longitude];
            console.log(district, cord);
            mapRef.current.flyTo(cord, 11)
        }
    }
    return (
        <section className="mt-10">
            <h2 className="text-3xl md:text-5xl">We are available in 64 districts</h2>
            <section className="mt-8">
                <h3 className="text-2xl my-3">We deliver almost all over Bangladesh</h3>
                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name="district" required placeholder="Search Your District" />
                    </label>
                </form>
                <div className="border w-full h-[600px] mt-6">
                    <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="w-full h-full" ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            warehouses.map((house, index) => <Marker key={index} position={[house.latitude, house.longitude]}>
                                <Popup>
                                    {house.district} <br /> {house.covered_area.join(', ')}
                                </Popup>
                            </Marker>)
                        }
                    </MapContainer>
                </div>
            </section>
        </section>
    );
}