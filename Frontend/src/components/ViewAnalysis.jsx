import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#34D399', '#FBBF24', '#F87171'];

const ViewAnalysis = ({ analysis }) => {
    console.log(analysis)
  const {
    cameraAnalysis,
    transcriptAnalysis,
    createdAt,
    role,
    skill,
  } = analysis;

  const overallScores = transcriptAnalysis.reduce(
    (acc, item) => {
      Object.keys(item.evaluation).forEach(key => {
        if (key !== 'feedback') acc[key] += item.evaluation[key];
      });
      return acc;
    },
    {
      knowledge: 0,
      fluency: 0,
      relevance: 0,
      communicationClarity: 0,
      confidence: 0,
    }
  );

  
  const scoreData = Object.keys(overallScores).map(key => ({
    name: key,
    score: Number((overallScores[key] / transcriptAnalysis.length).toFixed(1))

  }));
  console.log(scoreData);
   
  const scriptStats = transcriptAnalysis.reduce(
    (acc, item) => {
        acc.fillerCount += item.fillerCount || 0;
        acc.longPauseCount += item.longPauseCount || 0;
        return acc;
    },
    { fillerCount: 0, longPauseCount: 0 }
  );


  const sentimentCounts = transcriptAnalysis.reduce(
    (acc, item) => {
      Object.keys(item.sentimentCounts).forEach(sentiment => {
        acc[sentiment] += item.sentimentCounts[sentiment];
      });
      return acc;
    },
    {
      POSITIVE: 0,
      NEUTRAL: 0,
      NEGATIVE: 0,
    }
  );

  const sentimentData = Object.keys(sentimentCounts).map(key => ({
    name: key,
    value: sentimentCounts[key],
  }));

  const formatTimeAgo = isoTime => {
    const seconds = Math.floor((new Date() - new Date(isoTime)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getAttentionFeedback = (attention) => {
  if (attention >= 90) return "Excellent focus maintained throughout the interview.";
  if (attention >= 75) return "Great job staying focused! Just a bit more consistency needed.";
  if (attention >= 50) return "Fair attention, but there’s room for improvement.";
  return "Try to stay more engaged and avoid distractions during interviews.";
    };

  const getScriptFeedback = (fillerCount, longPauseCount) => {
  if (fillerCount <= 3 && longPauseCount <= 2) {
    return "Excellent fluency with minimal hesitations or filler usage.";
  } else if (fillerCount <= 7 && longPauseCount <= 5) {
    return "Good fluency. A few fillers or pauses detected.";
  } else if (fillerCount <= 15 || longPauseCount <= 8) {
    return "Noticeable use of filler words or long pauses. Try practicing smoother delivery.";
  } else {
    return "Frequent hesitations and filler words affected fluency. Consider improving pacing and clarity.";
  }
};

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold">Interview Analysis</h2>
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Role</div>
          <div className="stat-value">{role}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Skill</div>
          <div className="stat-value">{skill}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Created</div>
          <div className="stat-value">{formatTimeAgo(createdAt)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="card bg-base-100 shadow-xl p-5">
          <h3 className="text-xl font-semibold mb-4">Overall Scores</h3>
              <div style={{ overflowX: "auto" }}>
      <div style={{ width: `${scoreData.length * 100}px`, minWidth: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={scoreData}
            margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              tick={{ fill: "#6B7280", fontSize: 13 }}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#F9FAFB", borderRadius: "8px", border: "none" }}
              labelStyle={{ fontWeight: "bold", color: "#4B5563" }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Bar
              dataKey="score"
              fill="#34D399"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
        </div>

        <div className="card bg-base-100 shadow-xl p-5">
          <h3 className="text-xl font-semibold mb-4">Sentiment Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl p-5">
        <h3 className="text-xl font-semibold mb-4">Camera Analysis</h3>
        <p className="mb-2">Attention Level: <span className="badge badge-accent">{cameraAnalysis.attentionPercent}%</span></p>
        <p className="mb-2">Distraction Time: {cameraAnalysis.totalDistraction}s</p>
        <p className={`mt-2 ${cameraAnalysis.attentionPercent >= 90 ? 'text-green-400' : cameraAnalysis.attentionPercent >= 75 ? 'text-yellow-400' : 'text-red-400'} font-medium`}>{getAttentionFeedback(cameraAnalysis.attentionPercent)}</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-5">
        <h3 className="text-xl font-semibold mb-4">Script Analysis</h3>
        <p className="mb-2">Total Filler Words: <span className="badge badge-warning">{scriptStats.fillerCount}</span></p>
        <p className="mb-2">Total Long Pauses: <span className="badge badge-info">{scriptStats.longPauseCount}</span></p>
        <p className="mt-2 text-blue-500 font-medium">{getScriptFeedback(scriptStats.fillerCount, scriptStats.longPauseCount)}</p>
      </div>


      <div className="card bg-base-100 shadow-xl p-5">
        <h3 className="text-xl font-semibold mb-4">Question-wise Feedback</h3>
        <div className="space-y-3">
          {transcriptAnalysis.map((item, index) => (
            <div key={index} className="collapse collapse-arrow border border-base-300 bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                Q{index + 1}: {item.question}
              </div>
              <div className="collapse-content">
                <p className="mb-2 text-sm"><strong>Response:</strong> {item.response}</p>
                <p className="mb-2 text-sm text-warning"><strong>Feedback:</strong> {item.evaluation.feedback}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {Object.entries(item.evaluation).map(([key, val]) => (
                    key !== 'feedback' && (
                      <div key={key} className="badge badge-outline">
                        {key}: {val}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAnalysis;
