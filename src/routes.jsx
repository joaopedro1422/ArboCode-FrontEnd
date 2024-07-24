

function AppRoutes(){
    return(
        <BrowseRouter>
            <Routes>
                <Route path="/" element= {<Login/>}></Route>
            </Routes>
        </BrowseRouter>
    )
}

export default AppRoutes