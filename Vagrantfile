# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/bionic64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  config.vm.network "forwarded_port", guest: 4000, host: 4000, host_ip: "127.0.0.1"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    # Bump memory to 1 GB: "yarn build" doesn't fit into 0.5 GB.
    vb.memory = "1024"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.

  # Install dependencies.
  config.vm.provision "shell", privileged: true, inline: <<-SHELL
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" >/etc/apt/sources.list.d/yarn.list
    apt-get update

    apt-get install -y build-essential ruby-bundler ruby-dev yarn

    # https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
    echo 'fs.inotify.max_user_watches = 524288' >/etc/sysctl.d/60-fs.inotify.max_user_watches.conf
    sysctl --system
  SHELL

  # Set up project.
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    cd /vagrant

    bundle install
    yarn
    yarn build
  SHELL

  # Show a usage message.
  config.vm.provision "shell", privileged: false, run: "always", inline: <<-SHELL
    echo "Jekyll environment ready for use. To run:"
    echo "vagrant ssh -c 'cd /vagrant && bundle exec jekyll serve --force_polling --host 0.0.0.0'"
  SHELL

end
