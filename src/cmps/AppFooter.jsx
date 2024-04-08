// export function AppFooter() {
//     return (
//         <div className="app-container">
//             <footer className="app-footer">
//                 <div className="second-section-footer">
//                     <span> English (US) </span>
//                     <span> $ USD </span>
//                     <span> Support & resources </span>
//                 </div>
//                 <div className="footer-content">

//                     © 2024 Airstay, Inc. · <span> Terms </span> · <span> Sitemap </span> · <span> Privacy </span>· <span> Your Privacy Choices </span> <img className="privacy-icon" src="src/assets/img/small-icons/asset 99.svg" alt="" />

//                 </div>
//             </footer>
//         </div>
//     );
// }

export function AppFooter() {
    return (
        <footer className="app-footer full">
            <div className="footer-content">

                <div className="footer-main-content">
                    © 2024 Airstay, Inc. · <span> Terms </span> · <span> Sitemap </span> · <span> Privacy </span> · <span> Your Privacy Choices </span>
                    <img className="privacy-icon" src="src/assets/img/small-icons/asset 99.svg" alt="" />
                </div>
                <div className="second-section-footer">
                    <p className="lan-footer "><i className="fa-solid fa-globe"></i><span> English (US)</span> </p>
                    <span className="cur-footer"> $USD </span>
                    <span className="support-footer"> Support & resources </span>
                </div>
            </div>
        </footer>
    );
}

