(function() {

  function createBranchingBaseMemoir() {
    return new gitMemoir.MemoirBuilder()
      .fileSystem('demo', fs => {}, { showFiles: false })
      .repo('demo', {}, { showInternals: false })
      .chapter('setup')
        .commit({ commit: { hash: '387f12' } })
      .chapter('commits')
        .commit({ commit: { hash: '9ab3fd' } })
        .commit({ commit: { hash: '4f94fa' } })
      .chapter('branch')
        .branch('feature-sub')
      .chapter('checkout')
        .checkout('feature-sub')
      .chapter('commit-on-a-branch')
        .commit({ commit: { hash: '712ff2' } })
      .chapter('back-to-master')
        .checkout('master')
      .chapter('another-branch')
        .checkout('fix-add', { new: true });
  }

  subject.gitMemoirs.branchingOneLine = function() {
    return createBranchingBaseMemoir()
      .chapter('padding')
        .checkout('feature-sub')
        .commit()
        .commit()
      .memoir;
  };

  subject.gitMemoirs.branching = function() {
    return createBranchingBaseMemoir()
      .chapter('divergent-history')
        .commit({ commit: { hash: '2817bc' } })
      .chapter('switch-branches')
        .checkout('feature-sub')
        .checkout('fix-add')
      .chapter('fast-forward-merge')
        .checkout('master')
        .merge('fix-add')
      .chapter('delete-branch')
        .branch('fix-add', { delete: true })
      .chapter('work-on-feature-branch')
        .checkout('feature-sub')
        .commit({ commit: { hash: 'f92ab0' } })
      .chapter('merge')
        .checkout('master')
        .merge('feature-sub', { commit: { hash: '04fb82' } })
      .memoir;
  };
})();