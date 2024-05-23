import profileIcon from '../profile_icon.png';
import { getUserProfile } from '../services/UserProfileService.js';
import { useState, useRef, useEffect } from 'react';
import { handleMouseClickForDropdown, getPartnerManagerUrl } from '../utils/AppUtils.js';
import { useTranslation } from 'react-i18next';
import hamburgerIcon from '../svg/hamburger_icon.svg';
import orgIcon from '../svg/org_icon.svg';

function HeaderNav({ open, setOpen }) {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const clickOutSideDropdown = handleMouseClickForDropdown(dropdownRef, () => setIsDropdownOpen(false));
        return clickOutSideDropdown;
    }, [dropdownRef]);

    const openDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const logout = async () => {
        // const cachedAppConfig = await getAppConfig();
        // if (cachedAppConfig)
        // console.log(cachedAppConfig['sbiPorts']);
        localStorage.clear();
        let redirectUrl = process.env.NODE_ENV !== 'production'? '' : window._env_.REACT_APP_PARTNER_MANAGER_API_BASE_URL; 
        redirectUrl = redirectUrl + getPartnerManagerUrl(`/logout/user?redirecturi=` + btoa(window.location.href), process.env.NODE_ENV);
        console.log(redirectUrl);
        window.location.href = redirectUrl;
    }
    
    return (
        <nav className="flex justify-between w-full h-16 font-inter shadow-[rgba(0,0,0,0.13)_5px_3px_8px_0px] relative">
            <div className="p-6 cursor-pointer" onClick={() => setOpen(!open)}>
                <img src={hamburgerIcon} alt=""></img>
            </div>
            <div className="px-5 xl:px-12">
                <div className=" flex-1 justify-evenly mt-6 cursor-pointer">
                    &nbsp;
                </div>
            </div>
            <div className="flex items-center relative justify-between space-x-14">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-50">
                        <img src={orgIcon} alt=""></img>
                    </div>

                    <h2 className="text-xs font-bold text-gray-600 ml-1">{getUserProfile().orgName}</h2>
                </div>
                <div className="flex items-center mr-2" ref={dropdownRef}>
                    <button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-transparent"
                        onClick={openDropdown}>
                        <img className="h-11 w-10 rounded-full" src={profileIcon} alt="" />
                    </button>
                    <svg className="w-4 h-4 ml-2 text-gray-800 cursor-pointer" viewBox="0 0 24 24" onClick={openDropdown}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                    {isDropdownOpen && (
                        <div className=" absolute top-14 right-7 z-10 w-40 h-33 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-gray-50 focus:outline-none">
                            <button className="block px-4 py-2 text-sm text-gray-900 text-left">{t('header.partnerProfile')}</button>
                            <div className="border-gray-100 border-t mx-2"></div>
                            <button className="block px-4 py-2 text-sm text-gray-900 text-left">{t('header.changePassword')}</button>
                            <div className="border-t border-gray-100 mx-2"></div>
                            <button className="block px-4 py-2 text-sm text-red-700 text-left" onClick={logout}>{t('header.logout')}</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default HeaderNav;