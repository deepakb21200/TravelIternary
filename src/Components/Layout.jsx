import Sidebar from "./Sidebar"

 

function Layout({children}) {
 return (
        <div className="main">
          
            <div className={`left `}>
                <Sidebar/>  
            </div> 


             <div className={`right`}>
                {children}
            </div>
        </div>
    )
}

export default Layout