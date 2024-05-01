import { useNavigate } from "react-router-dom";

function Card(props) {
  const {title, price, company, image} = props.data.attributes;
  const {id} = props.data;
  const { isGrid } = props
  const navigate = useNavigate();

  function handleRedirect(e) {
    e.preventDefault();

    navigate(`/product/${id}`);
  }

  return (
    <>
      <div onClick={handleRedirect} className={`card ${isGrid ? 'w-80' : 'w-full'} bg-base-100 mt-10 shadow-xl transition duration-400 hover:shadow-2xl`}>
        <div className={`${isGrid ? 'flex-col' : 'flex justify-between items-start'}`}>
          <figure className={`${isGrid ? 'px-5 pt-5' : 'p-6'}`}>
            <img
              src={image}
              alt="comfy store"
              className={`rounded-lg bg-cover ${isGrid ? 'w-96 h-72' : 'w-36 h-40'}`}
            />
          </figure>
          <div className={`card-body ${isGrid ? 'items-center text-center' : 'flex justify-end'}`}>
              <div className="flex flex-col">
                <p className="card-title">{title}</p>
                <p className={`${isGrid ? '' : 'card-title opacity-35 text-gray-600 text-sm'}`}>{isGrid ? '' : company}</p>
              </div>
          </div>
          <p className={`text-accent-content text-center ${isGrid ? 'mb-5 mt-[-18px]' : 'mt-9 mr-10'}`}>${price / 100}</p>
        </div>
      </div>
    </>
  );
}

export default Card;