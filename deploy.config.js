const stages = {
  development: {
    defaultBranch: 'develop',
    deploymentArtifactBucket:
      'storagestack-deploymentartifactsbucket43afd317-1an788nm64tuu',
    deploymentArtifactFolder: 'employee-bonus',
    functionName:
      'arn:aws:lambda:us-east-1:102551228732:function:EmployeeBonusStack-EmployeeBonusApiWebFunction0005-4gyQiHf4Eo3a',
  },
};

module.exports = {
  stageName: function () {
    return process.env.STAGE || 'development';
  },
  branch: function () {
    return process.env.BRANCH || stages[this.stageName()].defaultBranch;
  },
  deploymentArtifactBucket: function () {
    return stages[this.stageName()].deploymentArtifactBucket;
  },
  deploymentArtifactFolder: function () {
    return stages[this.stageName()].deploymentArtifactFolder;
  },
};
