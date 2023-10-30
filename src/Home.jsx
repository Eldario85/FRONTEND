import React from "react";

import "./styles/App.css";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-around">
        <div className="text-center ">
          <h4 className="titulos">Camisetas Argentinas</h4>
          <MDBCarousel showControls dealy={3000}>
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={1}
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/401778e50ef4449d9656d40e9346b8af_9366/Camiseta_Titular_River_Plate_23-24_Blanco_HT3679_01_laydown.jpg"
              alt="..."
            />
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={2}
              src="https://pbs.twimg.com/media/CQfjMNEWUAA3BFc.jpg"
              alt="..."
            />
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={3}
              src="https://sporting.vteximg.com.br/arquivos/ids/201295-1000-1000/1640020-000-1.jpg?v=637152942987430000"
              alt="..."
            />
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={4}
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/43b3d5dca79c4970ba7d510045536008_9366/Camiseta_Titular_Boca_Juniors_23-24_Azul_IV1922_01_laydown.jpg"
              alt="..."
            />
          </MDBCarousel>
        </div>
        <div className="text-center ">
          <h4 className="titulos">Camisetas Europeas</h4>
          <MDBCarousel showControls dealy={3000}>
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={1}
              src="https://img.planetafobal.com/2013/08/real-madrid-adidas-titular-2013-2014-camiseta.jpg"
              alt="..."
            />
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={2}
              src="https://todosobrecamisetas.com/wp-content/uploads/bayern-munich-2022-23-adidas-home-kit-9.jpg"
              alt="..."
            />
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={3}
              src="https://th.bing.com/th/id/OIP.Pbs6dp8ZMx_FRgNi0qhr_gHaHa?pid=ImgDet&rs=1"
              alt="..."
            />
          </MDBCarousel>
        </div>
        <div className="text-center">
          <h4 className="titulos">Otras Camisetas</h4>
          <MDBCarousel showControls dealy={3000}>
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={1}
              src="https://celadasa.vtexassets.com/arquivos/ids/241776-800-auto?v=638327255432300000&width=800&height=auto&aspect=true"
              alt="..."
            />
            <MDBCarouselItem
              className="w-100 d-block my-custom-carousel-item img-fluid"
              itemId={2}
              src="https://acdn.mitiendanube.com/stores/002/240/024/products/unnamed-21-5aea549f9b2dc843c316784122907992-1024-1024.webp"
              alt="..."
            />
          </MDBCarousel>
        </div>
      </div>
    </>
  );
}
