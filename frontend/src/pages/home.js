import { useState, useEffect } from "react";
import Button from "../components/button/button";
import { fetchRecords, createRecord , deleteRecord  ,bulkUpdateRecord} from "../components/service/api.services";

function Home() {
  const [quote, setQuote] = useState("");
  const [txtQuote, setTxtQuote] = useState("");
 const [editBln , setEditBln] = useState(false);
  const [error, setError] = useState("");
const [id , setId] = useState("");
const [hovered, setHovered] = useState(-1);

  const fetchQuoteData = async () => {
    const quoteData = await fetchRecords(`quote`);
    setQuote(quoteData);
  };
  const toggleHover = (val) => {
    setHovered(val);
  }
  useEffect(() => {
    fetchQuoteData();
  }, []);

  const handleQuoteSubmit = async (event) => {
    event.preventDefault();
    !txtQuote ? setError("Quote is empty") : setError("");
    try {
      const recored = await createRecord(`quote/create`, {
        quote: txtQuote,
      });

      if (recored.status) {
        fetchQuoteData();
            setTxtQuote('');
    }
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = (e) => {
    
    setEditBln(true)
    setId(e._id);
    setTxtQuote(e.quoteName);
        
  };

  const handleEditSubmit = async(e) =>{
    e.preventDefault();
    
    const updateRecords = await bulkUpdateRecord(`quote/${id}`,  {
        quote: txtQuote,
      });
      if(updateRecords.status) {fetchQuoteData()
        setId("")
    setTxtQuote("");
    setEditBln(false);
    }
    
  }
  
  const handleDelete = async(e) => {
    const del = await deleteRecord(`quote`, e)
    
    if(del.status){
        fetchQuoteData();
    }
  };

  return (
    <section className="p-4 mt-3">
      <div className="container mb-4">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="quoteId" className="form-label">
              Quote
            </label>
            <input
              type="text"
              value={txtQuote}
              onChange={(e) => setTxtQuote( e.target.value)}
              className="form-control"
              id="quoteId"
            />
          </div>

          <div className="col-12">
         { editBln ? <Button
              classname="btn btn-lg btn-primary cust-right-margin  border border-2 border-dark fw-semibold"
              label="update Quote"
              onClick={handleEditSubmit}
            /> : 
            <Button
              classname="btn btn-lg btn-primary cust-right-margin  border border-2 border-dark fw-semibold"
              label="Create Quote"
              onClick={handleQuoteSubmit}
            />}
          </div>
        </form>
      </div>
      <div className="container">
        <p>{error}</p>
      </div>
      <div className="container mb-4">
        <div className="col-md-12">
        {quote?.length > 0 ? (  <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Quote </th>
                <th scope="col">Authore Name </th>
              </tr>
            </thead>
            <tbody>
             
                {quote?.map((data, index) => (
                  <tr  onMouseEnter={() =>toggleHover(index) } onMouseLeave={() =>toggleHover(-1)} key={index}>
                    <td>{index + 1}</td>
                    <td>{data.quoteName}</td>
                    <td>{data.authorName}</td>
                    
                    <td className={`${hovered === index ? 'show' : 'hide' } `}>
                      <Button
                        classname="btn btn-sm btn-primary"
                        label="Edit Quote"
                        onClick={() => handleEdit(data)}
                      /> 
                       <Button
                        classname="btn btn-sm btn-primary   "
                        label="Delete Quote"
                        onClick={() => handleDelete(data._id)}
                      />
                    </td>
                     
                  </tr>
                ))}
             
            </tbody>
          </table>
        ) : <h2>Data not found</h2>}
        </div>
      </div>
    </section>
  );
}

export default Home;
