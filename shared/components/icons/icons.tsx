export interface IconProps {
    className?: string;
    onClick?: () => void;
    width: number;
}

// svgrepo.com

export const Close = (props: IconProps) => {
    return <div
        className={props.className}
        onClick={props.onClick}
    >
        <svg
            className={`w-px-${props.width}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 2">
                <g data-name="close">
                    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                    <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                </g>
            </g>
        </svg>
    </div>;
};

export const SpinnerIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
    >
        <svg fill="currentColor" className={`w-px-${props.width} spin`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/>
        </svg>
    </div>;
};

export const ArrowLeft = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 556.424 556.424">
            <path d="M508.094,13.5C511.82,6.043,508.087,0,499.749,0c0,0-205.77,0-205.773,0c-19.045,0.006-44.079,38.363-56.512,52.262
			C215.594,76.711,50.874,259.809,49.681,262.196c-3.727,7.458-3.727,19.544,0,27.001l222.456,253.726
			c3.727,7.458,13.507,13.501,21.843,13.501h205.77c8.335,0,12.071-6.043,8.345-13.501L285.638,289.197
			c-3.728-7.457-3.728-19.544,0-27.001L508.094,13.5z"/>
        </svg>
    </div>;
};

export const ArrowRight = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 490 490">
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0"/>
        </svg>
    </div>;
};

export const FavouriteIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px" viewBox="0 0 487.222 487.222">
            <path
                d="M486.554,186.811c-1.6-4.9-5.8-8.4-10.9-9.2l-152-21.6l-68.4-137.5c-2.3-4.6-7-7.5-12.1-7.5l0,0c-5.1,0-9.8,2.9-12.1,7.6   l-67.5,137.9l-152,22.6c-5.1,0.8-9.3,4.3-10.9,9.2s-0.2,10.3,3.5,13.8l110.3,106.9l-25.5,151.4c-0.9,5.1,1.2,10.2,5.4,13.2   c2.3,1.7,5.1,2.6,7.9,2.6c2.2,0,4.3-0.5,6.3-1.6l135.7-71.9l136.1,71.1c2,1,4.1,1.5,6.2,1.5l0,0c7.4,0,13.5-6.1,13.5-13.5   c0-1.1-0.1-2.1-0.4-3.1l-26.3-150.5l109.6-107.5C486.854,197.111,488.154,191.711,486.554,186.811z M349.554,293.911   c-3.2,3.1-4.6,7.6-3.8,12l22.9,131.3l-118.2-61.7c-3.9-2.1-8.6-2-12.6,0l-117.8,62.4l22.1-131.5c0.7-4.4-0.7-8.8-3.9-11.9   l-95.6-92.8l131.9-19.6c4.4-0.7,8.2-3.4,10.1-7.4l58.6-119.7l59.4,119.4c2,4,5.8,6.7,10.2,7.4l132,18.8L349.554,293.911z"/>
        </svg>
    </div>;
};

export const FavouriteFullIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px" viewBox="0 0 478.53 478.53">
            <path
                d="M477.795,184.279c-1.765-5.431-6.458-9.389-12.108-10.209l-147.159-21.384l-65.812-133.35    c-2.527-5.12-7.741-8.361-13.451-8.361s-10.924,3.241-13.451,8.361l-65.812,133.35L12.843,174.07    c-5.65,0.82-10.344,4.778-12.108,10.209c-1.765,5.43-0.293,11.391,3.796,15.376l106.484,103.798L85.877,450.018    c-0.965,5.627,1.349,11.314,5.968,14.671c4.618,3.354,10.741,3.799,15.797,1.142l131.623-69.199l131.623,69.199    c2.195,1.153,4.592,1.723,6.979,1.723c3.11,0,6.205-0.966,8.818-2.864c4.619-3.356,6.933-9.044,5.968-14.671l-25.138-146.565    l106.484-103.798C478.088,195.669,479.56,189.708,477.795,184.279z"/>

        </svg>
    </div>;

};

export const ArrowUp = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg
            fill={props.color}
            viewBox="-32 0 512 512"
            className={`w-px-${props.width}`}
        >
            <path
                d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"/>
        </svg>
    </div>;
};

export const ArrowDown = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg
            fill={props.color}
            viewBox="-32 0 512 512"
            className={`w-px-${props.width}`}
        >
            <path
                d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"/>
        </svg>
    </div>;
};

export const BarsIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 150 150">
            <path id="XMLID_241_" d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
            <path id="XMLID_242_" d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
            <path id="XMLID_243_" d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
        </svg>
    </div>;
};

export const LoginIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg version="1.1" x="0px" y="0px" fill="currentColor" className={`w-px-${props.width}`}
             viewBox="0 0 50 50">
            <path d="M25,1C11.767,1,1,11.767,1,25c0,7.091,3.094,13.472,8,17.869v0.017l0.348,0.3c0.061,0.053,0.128,0.097,0.19,0.149
		c0.431,0.364,0.875,0.713,1.331,1.047c0.123,0.09,0.246,0.177,0.371,0.264c0.484,0.34,0.979,0.664,1.487,0.968
		c0.085,0.051,0.172,0.099,0.257,0.148c0.557,0.324,1.126,0.629,1.71,0.908c0.006,0.003,0.012,0.005,0.018,0.008
		c1.249,0.595,2.559,1.082,3.915,1.456c0.025,0.007,0.05,0.015,0.075,0.021c0.641,0.175,1.293,0.322,1.954,0.443
		c0.062,0.011,0.123,0.022,0.185,0.033c0.638,0.112,1.284,0.201,1.939,0.262c0.075,0.007,0.15,0.011,0.224,0.017
		C23.663,48.965,24.327,49,25,49s1.337-0.035,1.996-0.09c0.075-0.006,0.15-0.01,0.224-0.017c0.655-0.06,1.301-0.15,1.939-0.262
		c0.062-0.011,0.123-0.022,0.185-0.033c0.661-0.121,1.313-0.268,1.954-0.443c0.025-0.007,0.05-0.014,0.075-0.021
		c1.356-0.374,2.666-0.861,3.915-1.456c0.006-0.003,0.012-0.005,0.018-0.008c0.584-0.279,1.153-0.585,1.71-0.908
		c0.086-0.05,0.172-0.097,0.257-0.148c0.509-0.304,1.004-0.629,1.487-0.968c0.124-0.087,0.248-0.174,0.371-0.264
		c0.456-0.334,0.9-0.683,1.331-1.047c0.062-0.052,0.129-0.096,0.19-0.149l0.348-0.3v-0.017c4.906-4.398,8-10.778,8-17.869
		C49,11.767,38.233,1,25,1z M25,25c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S29.411,25,25,25z M28,27c6.065,0,11,4.935,11,11
		v3.958c-0.042,0.035-0.086,0.067-0.128,0.102c-0.395,0.321-0.8,0.626-1.214,0.918c-0.092,0.065-0.182,0.132-0.274,0.195
		c-0.447,0.305-0.906,0.591-1.373,0.862c-0.085,0.05-0.171,0.099-0.257,0.148c-0.49,0.275-0.989,0.533-1.498,0.769
		c-0.053,0.025-0.107,0.049-0.161,0.073c-1.661,0.755-3.411,1.302-5.212,1.626c-0.057,0.01-0.114,0.021-0.171,0.031
		c-0.567,0.097-1.139,0.172-1.715,0.225c-0.079,0.007-0.159,0.012-0.239,0.018C26.175,46.97,25.589,47,25,47
		s-1.175-0.03-1.758-0.077c-0.079-0.006-0.159-0.011-0.239-0.018c-0.576-0.053-1.148-0.127-1.715-0.225
		c-0.057-0.01-0.114-0.02-0.171-0.031c-1.801-0.324-3.551-0.871-5.212-1.626c-0.054-0.025-0.108-0.048-0.161-0.073
		c-0.509-0.236-1.008-0.494-1.498-0.769c-0.086-0.049-0.171-0.098-0.257-0.148c-0.467-0.27-0.926-0.557-1.373-0.862
		c-0.093-0.063-0.183-0.13-0.274-0.195c-0.414-0.292-0.819-0.596-1.214-0.918c-0.042-0.034-0.086-0.067-0.128-0.102V38
		c0-6.065,4.935-11,11-11H28z M41,40.076V38c0-6.271-4.464-11.519-10.38-12.735C33.261,23.464,35,20.431,35,17
		c0-5.514-4.486-10-10-10s-10,4.486-10,10c0,3.431,1.739,6.464,4.38,8.265C13.464,26.481,9,31.729,9,38v2.076
		C5.284,36.135,3,30.831,3,25C3,12.869,12.869,3,25,3s22,9.869,22,22C47,30.831,44.716,36.135,41,40.076z"/>
        </svg>
    </div>;
};

export const NotificationIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" fill="currentColor" className={`w-px-${props.width}`}>
            <g className="style-scope yt-icon">
                <path
                    d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"
                />
            </g>
        </svg>
    </div>;
};
export const EnvelopeIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px"
             viewBox="0 0 60 60">
            <path d="M0,8.5v2.291v38.418V51.5h60v-2.291V10.791V8.5H0z M36.625,30.564l-5.446,5.472c-0.662,0.615-1.698,0.614-2.332,0.026
	l-5.473-5.498l0.048-0.047L3.647,10.5h52.719L36.577,30.518L36.625,30.564z M20.524,30.533L2,48.355V11.923L20.524,30.533z
	 M21.934,31.95l5.523,5.549c0.709,0.661,1.619,0.993,2.533,0.993c0.923,0,1.85-0.339,2.581-1.02l5.496-5.522L56.304,49.5H3.686
	L21.934,31.95z M39.477,30.534L58,11.922v36.433L39.477,30.534z"/>
        </svg>
    </div>;
};

export const FacebookIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width} hover-facebook`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title>
            <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
    </div>;
};

export const InstagramIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width} hover-instagram`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title>
            <path
                d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
    </div>;
};

export const LinkedInIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width} hover-linkedin`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title>
            <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    </div>;
};

export const TwitterIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width} hover-twitter`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title>
            <path
                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
    </div>;
};

export const LogoutIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 64 64">
            <path
                d="M43.25 40.68C42.9185 40.68 42.6005 40.8117 42.3661 41.0461C42.1317 41.2805 42 41.5985 42 41.93V58.75H5.25V5.25H42V22.07C42 22.4015 42.1317 22.7195 42.3661 22.9539C42.6005 23.1883 42.9185 23.32 43.25 23.32C43.5815 23.32 43.8995 23.1883 44.1339 22.9539C44.3683 22.7195 44.5 22.4015 44.5 22.07V4C44.5 3.66848 44.3683 3.35054 44.1339 3.11612C43.8995 2.8817 43.5815 2.75 43.25 2.75H4C3.66848 2.75 3.35054 2.8817 3.11612 3.11612C2.8817 3.35054 2.75 3.66848 2.75 4V60C2.75 60.3315 2.8817 60.6495 3.11612 60.8839C3.35054 61.1183 3.66848 61.25 4 61.25H43.25C43.5815 61.25 43.8995 61.1183 44.1339 60.8839C44.3683 60.6495 44.5 60.3315 44.5 60V41.93C44.5 41.5985 44.3683 41.2805 44.1339 41.0461C43.8995 40.8117 43.5815 40.68 43.25 40.68Z"
            />
            <path
                d="M60.63 30.9199L48 23.6299C47.7544 23.4859 47.467 23.43 47.1853 23.4715C46.9037 23.513 46.6446 23.6494 46.451 23.8582C46.2574 24.0669 46.1409 24.3355 46.1207 24.6195C46.1005 24.9035 46.1779 25.1859 46.34 25.4199L50 30.7499H18.63C18.2985 30.7499 17.9805 30.8816 17.7461 31.1161C17.5117 31.3505 17.38 31.6684 17.38 31.9999C17.38 32.3315 17.5117 32.6494 17.7461 32.8838C17.9805 33.1183 18.2985 33.2499 18.63 33.2499H50L46.34 38.58C46.1885 38.8151 46.1195 39.0941 46.144 39.3728C46.1685 39.6515 46.2851 39.9141 46.4753 40.1192C46.6655 40.3243 46.9186 40.4603 47.1947 40.5057C47.4708 40.5511 47.7541 40.5034 48 40.3699L60.63 33.08C60.8164 32.968 60.9706 32.8096 61.0777 32.6204C61.1847 32.4311 61.241 32.2174 61.241 31.9999C61.241 31.7825 61.1847 31.5688 61.0777 31.3795C60.9706 31.1903 60.8164 31.0319 60.63 30.9199V30.9199Z"
            />
        </svg>
    </div>;
};

export const MoneyIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 16 16">
            <path
                d="M15.52 5.06a.48.48 0 01.472.394L16 5.54v7.04a1.12 1.12 0 01-.998 1.113l-.122.007H3.36a.48.48 0 01-.086-.952l.086-.008h11.52a.16.16 0 00.152-.11l.008-.05V5.54a.48.48 0 01.48-.48zm-1.28-1.28a.48.48 0 01.472.394l.008.086v7.04a1.12 1.12 0 01-.998 1.113l-.122.007H2.08a.48.48 0 01-.086-.952l.086-.008H13.6a.16.16 0 00.152-.11l.008-.05V4.26a.48.48 0 01.48-.48zM11.683 2.5c.795 0 1.44.645 1.44 1.44v5.484a1.44 1.44 0 01-1.44 1.44H1.44A1.44 1.44 0 010 9.424V3.94C0 3.145.645 2.5 1.44 2.5zM.96 8.634v.79c0 .265.215.48.48.48l.789-.001L.96 8.634zm8.575-5.175H3.588L.96 6.087v1.189l2.627 2.627h5.949l2.627-2.628V6.088L9.535 3.459zm2.628 5.174l-1.269 1.27h.79a.48.48 0 00.471-.393l.008-.086v-.791zM6.562 4.351a2.33 2.33 0 110 4.662 2.33 2.33 0 010-4.662zm0 .96a1.37 1.37 0 100 2.742 1.37 1.37 0 000-2.742zm-3.438.89a.49.49 0 01.48.5c0 .246-.17.45-.394.493l-.086.008h-.529a.49.49 0 01-.48-.5c0-.246.17-.45.394-.492l.086-.008h.53zm7.404 0a.49.49 0 01.48.5c0 .246-.17.45-.394.493l-.086.008h-.529a.49.49 0 01-.48-.5c0-.246.17-.45.394-.492l.086-.008h.529zm1.155-2.741l-.79-.001 1.27 1.271v-.79a.48.48 0 00-.394-.472l-.086-.008zM2.23 3.459l-.79.001a.48.48 0 00-.48.48v.789l1.27-1.27z"
                fillRule="evenodd"
            />
        </svg>
    </div>;
};

export const BusinessIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 512 512">
            <path
                d="M432,176H320V64a48,48,0,0,0-48-48H80A48,48,0,0,0,32,64V480a16,16,0,0,0,16,16H152a8,8,0,0,0,8-8V416.45c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,192,416v72a8,8,0,0,0,8,8H464a16,16,0,0,0,16-16V224A48,48,0,0,0,432,176ZM98.08,431.87a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,431.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,351.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,271.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,191.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,98.08,111.87Zm80,240a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,351.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,271.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,191.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,178.08,111.87Zm80,320a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,431.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,351.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,271.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,191.87Zm0-80a16,16,0,1,1,13.79-13.79A16,16,0,0,1,258.08,111.87ZM444,464H320V208H432a16,16,0,0,1,16,16V460A4,4,0,0,1,444,464Z"/>
            <path d="M400,400a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
            <path d="M400,320a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
            <path d="M400,240a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
            <path d="M336,400a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
            <path d="M336,320a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
            <path d="M336,240a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z"/>
        </svg>

    </div>;
};

export const JobTypeIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 64 64"><title/>
            <g data-name="Layer 51" id="Layer_51">
                <rect height="2" width="2" x="31" y="5"/>
                <path d="M32,31A14,14,0,1,0,18,17,14,14,0,0,0,32,31ZM32,5A12,12,0,0,1,44,16H43v2h1A12,12,0,0,1,33,29V27H31V29A12,12,0,0,1,20.05,18H21V16h-.95A12,12,0,0,1,32,5Z"/>
                <path d="M34,18h4V16H34.85A2.81,2.81,0,0,0,33,14.15V9H31v9h3Z"/>
                <path
                    d="M48,33H16C8.83,33,3,38.45,3,45.14V61H61V45.14C61,38.45,55.17,33,48,33ZM35.91,35l-.54,6H28.63l-.54-6ZM36,51.44l-4,3.27-4-3.27L28.64,43h6.72ZM59,59H5V45.14C5,39.55,9.93,35,16,35H26.09l.62,7L26,52.33l6,5,6-5L37.29,42l.62-7H48c6.07,0,11,4.55,11,10.14Z"/>
            </g>
        </svg>

    </div>;
};

export const Eyeicon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 488.85 488.85">
            <path
                d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2   s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025   c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3   C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7   c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"
            />
        </svg>
    </div>;
};

export const CalendarIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 16 16">
            <path
                d="M12.255 0c.246 0 .45.173.492.402l.008.088v.816h1.776a1.47 1.47 0 011.462 1.328l.007.142V14.53A1.47 1.47 0 0114.53 16H1.47A1.47 1.47 0 010 14.53V2.777c0-.812.658-1.47 1.47-1.47h1.795V.49c0-.27.224-.49.5-.49.246 0 .45.173.492.402l.008.088v.816h7.49V.49c0-.27.224-.49.5-.49zm2.765 5.571H.979v8.96c0 .24.174.44.402.482l.088.007h13.062a.49.49 0 00.49-.49l-.001-8.959zM3.75 11.5a.75.75 0 110 1.5.75.75 0 010-1.5zm4.25 0A.75.75 0 118 13a.75.75 0 010-1.5zm4.28.002a.746.746 0 01.72.749.751.751 0 01-1.5-.001.751.751 0 01.78-.748zM3.75 8a.75.75 0 110 1.5.75.75 0 010-1.5zM8 8a.75.75 0 110 1.5A.75.75 0 018 8zm4.25 0a.75.75 0 110 1.5.75.75 0 010-1.5zM3.265 2.285H1.469a.49.49 0 00-.49.49v1.796H15.02V2.776a.49.49 0 00-.401-.482l-.088-.008-1.776-.001v1.47c0 .27-.224.49-.5.49a.497.497 0 01-.492-.402l-.008-.088v-1.47h-7.49v1.47c0 .27-.224.49-.5.49a.497.497 0 01-.492-.402l-.008-.088v-1.47z"
                fillRule="evenodd"
            />
        </svg>
    </div>;
};
export const LocationIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} viewBox="0 0 16 16">
            <path
                d="M8.482 0a5.482 5.482 0 015.481 5.482c0 1.058-.608 2.692-1.68 4.792l-.336.644a68.928 68.928 0 01-2.766 4.7.83.83 0 01-1.399 0 68.829 68.829 0 01-2.765-4.7C3.737 8.508 3 6.646 3 5.482A5.482 5.482 0 018.482 0zm0 .997a4.485 4.485 0 00-4.485 4.485c0 1.608 1.843 5.171 4.192 8.915l.292.462.294-.462c2.28-3.637 4.08-7.091 4.187-8.764l.005-.151A4.485 4.485 0 008.482.997zm0 1.993a2.492 2.492 0 110 4.983 2.492 2.492 0 010-4.983zm0 .997a1.495 1.495 0 100 2.99 1.495 1.495 0 000-2.99z"
                fillRule="evenodd"
            />
        </svg>
    </div>;
};

export const EditIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px" viewBox="0 0 512.035 512.035">
            <polygon points="308.296,76.933 435.229,203.866 470.856,168.282 343.922,41.349"/>
            <path d="M485.945,26.272c-29.76-29.76-75.307-33.984-109.845-13.077l122.923,122.923     C519.907,101.6,515.726,56.054,485.945,26.272z"/>
            <path
                d="M36.511,348.442c-2.795,2.795-4.757,6.293-5.675,10.133L0.586,485.594c-1.728,7.189,0.427,14.784,5.675,20.011     c4.032,4.032,9.493,6.251,15.083,6.251c1.643,0,3.307-0.192,4.928-0.576l127.019-30.251c3.819-0.917,7.339-2.88,10.133-5.675     L405.044,234.01L278.111,107.077L36.511,348.442z M313.759,198.106c8.341,8.341,8.341,21.824,0,30.165l-85.333,85.333     c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251c-8.341-8.341-8.341-21.824,0-30.165l85.333-85.333     C291.935,189.765,305.418,189.765,313.759,198.106z"/>
        </svg>
    </div>;
};

export const MagnifyingGlassIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg
            className={`color--light`}
            fill="currentColor" x="0px" y="0px"
            width={`${props.width}px`}
            height={`${props.width}px`}
            viewBox="0 0 27.72 27.72"
        >
            <path d="M27.28,23.014l-8.158-7.048c-0.525-0.524-1.25-0.729-1.933-0.619c2.847-3.749,2.568-9.129-0.851-12.548
			c-3.733-3.732-9.807-3.732-13.539,0c-3.731,3.732-3.731,9.807,0,13.539c3.42,3.42,8.8,3.697,12.548,0.852
			c-0.108,0.683,0.095,1.404,0.619,1.933l7.048,8.16c0.87,0.871,2.839,0.312,3.709-0.557C27.596,25.853,28.151,23.885,27.28,23.014z
			 M14.114,14.112c-2.506,2.505-6.582,2.505-9.088,0c-2.507-2.505-2.506-6.583,0-9.087c2.504-2.505,6.582-2.506,9.086,0
			C16.618,7.53,16.618,11.608,14.114,14.112z"/>
            <path d="M5.684,9.34c-0.005-0.435-0.36-0.782-0.796-0.777c-0.437,0.005-0.781,0.36-0.777,0.795
			c0.02,1.655,0.672,3.212,1.844,4.384c0.309,0.307,0.808,0.307,1.113,0c0.309-0.307,0.309-0.805,0-1.113
			C6.188,11.749,5.698,10.581,5.684,9.34z"/>
        </svg>
    </div>;
};

export const TickIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg viewBox="0 0 191.667 191.667"
             fill="currentColor" x="0px" y="0px"
             width={`${props.width}px`}
             height={`${props.width}px`}
        >
            <path
                d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z   M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685  c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971  l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969  C156.146,65.765,156.146,74.362,150.862,79.646z"
            />
        </svg>
    </div>;
};

export const UploadIcon = (props: IconProps) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg
            fill="currentColor"
            x="0px"
            y="0px"
            width={`${props.width}px`}
            height={`${props.width}px`}
            viewBox="0 0 300 300"
        >
            <path
                d="M149.997,0.003C67.156,0.003,0,67.161,0,150s67.156,149.997,149.997,149.997C232.834,299.997,300,232.837,300,150    C300,67.158,232.834,0.003,149.997,0.003z M110.967,81.483l31.712-31.709c2.077-2.075,4.79-3.105,7.506-3.105    c0.026,0,0.054,0,0.078,0c0.029,0,0.054,0,0.078,0c2.715,0,5.434,1.03,7.511,3.105l31.707,31.709c4.15,4.147,4.15,10.872,0,15.017    c-2.072,2.075-4.793,3.112-7.508,3.112c-2.721,0-5.436-1.037-7.508-3.112l-14.016-14.013v32.259v20.749v3.888    c0,5.867-4.757,10.621-10.623,10.621c-5.867,0-10.618-4.754-10.618-10.621v-3.888v-20.749V83.207l-13.297,13.295    c-2.077,2.075-4.793,3.112-7.508,3.112c-2.721,0-5.436-1.037-7.511-3.112C106.819,92.355,106.819,85.627,110.967,81.483z     M231.576,209.318h-0.003c0,14.335-14.057,25.565-32.005,25.565h-99.132c-17.945,0-32.005-11.23-32.005-25.565V140.31    c0-14.337,14.057-25.568,32.005-25.568h13.385c1.522,0.272,3.079,0.431,4.658,0.431c1.569,0,3.115-0.161,4.63-0.431h0.612v20.749    h-23.285c-7.265,0-11.256,3.621-11.256,4.819v69.008c0,1.198,3.992,4.816,11.256,4.816h99.135c7.265,0,11.256-3.621,11.256-4.816    V140.31c0-1.198-3.992-4.819-11.256-4.819h-23.485v-20.749h1.437c1.481,0.257,2.988,0.431,4.526,0.431    c1.579,0,3.133-0.158,4.658-0.431h12.864c17.948,0,32.005,11.233,32.005,25.568V209.318z"/>

        </svg>
    </div>;
};
