type ProgressBarProps = {
    progress: number; // 進捗（0-100）
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px' }}>
            <div
                style={{
                    height: '5px',
                    width: `${progress}%`,
                    backgroundColor: '#3b82f6',
                    borderRadius: '5px',
                    transition: 'width 0.2s ease-out',
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
