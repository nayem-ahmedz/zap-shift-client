import LogoImg from '../../assets/logo.png';
export default function Logo(){
    return(
        <div className='flex items-end'>
            <img src={LogoImg} alt="zap-shift logo" />
            <h2 className='text-3xl -ms-2'>ZapShift</h2>
        </div>
    );
}