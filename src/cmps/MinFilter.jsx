

export function MinFilter({ miniClicked, setMiniClicked }) {



    return (
        <div className="main-min-filter" onClick={setMiniClicked(!miniClicked)}>

            <div className="where-min-filter">
                Anywhere
            </div>
            <div className="any-min-filter">
                Any week
            </div>
            <div className="guests-min-filter">
                Add guests
            </div>
            <div className="search-min-filter">
                <i className="fa fa-search"></i>
            </div>
        </div>
    )
}