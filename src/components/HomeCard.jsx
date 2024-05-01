import { useNavigate } from "react-router-dom";

function Card(props) {
  const {title, price, company, image} = props.data.attributes;
  const {id} = props.data;
  const navigate = useNavigate();

  function handleRedirect(e) {
    e.preventDefault();

    navigate(`/product/${id}`);
  }

  return (
    <>
      <div onClick={handleRedirect} className="card w-80 bg-base-100 mt-10 shadow-xl transition duration-400 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <figure className="p-6">
            <img
              src={image}
              alt="comfy store"
              className="rounded-lg bg-cover w-96 h-72"
            />
          </figure>
          <div className="card-body flex items-center mt-[-25px]">
            <p className="card-title text-center">{title}</p>
            <p className="text-accent-content">${price / 100}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
