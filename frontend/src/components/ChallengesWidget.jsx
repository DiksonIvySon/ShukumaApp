export default function ChallengesWidget({ challenges }) {
  return (
    <div className="challenges-list">
      {challenges?.map((challenge) => (
        <div key={challenge.id} className="challenge-card">
          <h4 className="challenge-title">{challenge.name}</h4>
          <div className="challenge-progress">
            <div
              className="challenge-progress-fill"
              style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray">
            {challenge.progress} / {challenge.total}
          </p>
        </div>
      ))}
    </div>
  )
}
