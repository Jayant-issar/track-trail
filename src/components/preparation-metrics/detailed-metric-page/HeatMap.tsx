import HeatMap from '@uiw/react-heat-map';


const HeatMapWrapper = (props: { value: { date: string; count: number }[] }) => {
    return(
        <div className='border-2 border-gray-700 rounded-lg p-4 bg-gray-800/50 mt-4'>
            <HeatMap
                className='w-full'
                value={props.value}
                weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                startDate={new Date(new Date().getFullYear(), 0, 1)}
                monthPlacement="top"
                monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                rectSize={14}
                space={4}
                rectProps={{
                    rx: 4,
                    className: 'hover:stroke-purple-400',
                }}
                rectRender={(props, data) => {
                    const fill = data.count ? 
                        `rgba(192, 132, 252, ${0.2 + (data.count / 20)})` : 
                        '#1f2937';
                    return <rect 
                        {...props}
                        rx={4}
                        fill={fill}
                        stroke="#4B5563"
                        strokeWidth={0.5}
                    />;
                }}
                legendRender={props => (
                    <rect 
                        {...props} 
                        rx={4} 
                        fill={ '#e052a0' }
                    />
                )}
                panelColors={{}}
                style={{
                    color: '#e5e7eb',
                    ['--rhm-month-label-color' as any]: '#9ca3af',
                    ['--rhm-week-label-color' as any]: '#9ca3af'
                }}
            />
        </div>
    )
}

export default HeatMapWrapper